import { useEffect, useRef } from 'react';

export default function FluidCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width  = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    const config = {
      TEXTURE_DOWNSAMPLE:    1,
      DENSITY_DISSIPATION:   0.97,
      VELOCITY_DISSIPATION:  0.98,
      PRESSURE_DISSIPATION:  0.8,
      PRESSURE_ITERATIONS:   25,
      CURL:                  30,
      SPLAT_RADIUS:          0.008,
    };

    const pointers: any[] = [];
    const splatStack: any[] = [];

    // ── WebGL context ─────────────────────────────────────────────────────────
    function getWebGLContext(c: HTMLCanvasElement) {
      const params = { alpha: true, depth: false, stencil: false, antialias: false };
      let gl: any = c.getContext('webgl2', params);
      const isWebGL2 = !!gl;
      if (!isWebGL2)
        gl = c.getContext('webgl', params) || c.getContext('experimental-webgl', params);

      let halfFloat: any;
      let supportLinearFiltering: any;
      if (isWebGL2) {
        gl.getExtension('EXT_color_buffer_float');
        supportLinearFiltering = gl.getExtension('OES_texture_float_linear');
      } else {
        halfFloat = gl.getExtension('OES_texture_half_float');
        supportLinearFiltering = gl.getExtension('OES_texture_half_float_linear');
      }

      gl.clearColor(0, 0, 0, 0);
      const halfFloatTexType = isWebGL2 ? gl.HALF_FLOAT : halfFloat.HALF_FLOAT_OES;

      function getSupportedFormat(gl: any, internalFormat: any, format: any, type: any): any {
        if (!supportRenderTextureFormat(gl, internalFormat, format, type)) {
          if (internalFormat === gl.R16F)   return getSupportedFormat(gl, gl.RG16F,   gl.RG,   type);
          if (internalFormat === gl.RG16F)  return getSupportedFormat(gl, gl.RGBA16F, gl.RGBA,  type);
          return null;
        }
        return { internalFormat, format };
      }

      function supportRenderTextureFormat(gl: any, internalFormat: any, format: any, type: any) {
        const tex = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, tex);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, 4, 4, 0, format, type, null);
        const fbo = gl.createFramebuffer();
        gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);
        return gl.checkFramebufferStatus(gl.FRAMEBUFFER) === gl.FRAMEBUFFER_COMPLETE;
      }

      const formatRGBA = isWebGL2 ? getSupportedFormat(gl, gl.RGBA16F, gl.RGBA, halfFloatTexType) : getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType);
      const formatRG   = isWebGL2 ? getSupportedFormat(gl, gl.RG16F,   gl.RG,   halfFloatTexType) : getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType);
      const formatR    = isWebGL2 ? getSupportedFormat(gl, gl.R16F,    gl.RED,  halfFloatTexType) : getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType);

      return { gl, ext: { formatRGBA, formatRG, formatR, halfFloatTexType, supportLinearFiltering } };
    }

    const { gl, ext } = getWebGLContext(canvas);

    // ── Pointer ───────────────────────────────────────────────────────────────
    function PointerPrototype(this: any) {
      this.id = -1; this.x = 0; this.y = 0;
      this.dx = 0; this.dy = 0;
      this.down = false; this.moved = false;
      this.color = [30, 0, 300];
    }
    pointers.push(new (PointerPrototype as any)());

    // ── Compile shader ────────────────────────────────────────────────────────
    function compileShader(type: number, source: string) {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
        throw new Error(gl.getShaderInfoLog(shader));
      return shader;
    }

    class GLProgram {
      uniforms: Record<string, WebGLUniformLocation> = {};
      program: WebGLProgram;
      constructor(vert: WebGLShader, frag: WebGLShader) {
        this.program = gl.createProgram();
        gl.attachShader(this.program, vert);
        gl.attachShader(this.program, frag);
        gl.linkProgram(this.program);
        if (!gl.getProgramParameter(this.program, gl.LINK_STATUS))
          throw new Error(gl.getProgramInfoLog(this.program));
        const n = gl.getProgramParameter(this.program, gl.ACTIVE_UNIFORMS);
        for (let i = 0; i < n; i++) {
          const name = gl.getActiveUniform(this.program, i).name;
          this.uniforms[name] = gl.getUniformLocation(this.program, name);
        }
      }
      bind() { gl.useProgram(this.program); }
    }

    // ── Shaders ───────────────────────────────────────────────────────────────
    const baseVert = compileShader(gl.VERTEX_SHADER, `precision highp float;attribute vec2 aPosition;varying vec2 vUv;varying vec2 vL;varying vec2 vR;varying vec2 vT;varying vec2 vB;uniform vec2 texelSize;void main(){vUv=aPosition*0.5+0.5;vL=vUv-vec2(texelSize.x,0.);vR=vUv+vec2(texelSize.x,0.);vT=vUv+vec2(0.,texelSize.y);vB=vUv-vec2(0.,texelSize.y);gl_Position=vec4(aPosition,0.,1.);}`);
    const clearFrag      = compileShader(gl.FRAGMENT_SHADER, `precision highp float;varying vec2 vUv;uniform sampler2D uTexture;uniform float value;void main(){gl_FragColor=value*texture2D(uTexture,vUv);}`);
    const displayFrag    = compileShader(gl.FRAGMENT_SHADER, `precision highp float;varying vec2 vUv;uniform sampler2D uTexture;void main(){gl_FragColor=texture2D(uTexture,vUv);}`);
    const splatFrag      = compileShader(gl.FRAGMENT_SHADER, `precision highp float;varying vec2 vUv;uniform sampler2D uTarget;uniform float aspectRatio;uniform vec3 color;uniform vec2 point;uniform float radius;void main(){vec2 p=vUv-point.xy;p.x*=aspectRatio;vec3 splat=exp(-dot(p,p)/radius)*color;vec3 base=texture2D(uTarget,vUv).xyz;gl_FragColor=vec4(base+splat,1.0);}`);
    const advManFrag     = compileShader(gl.FRAGMENT_SHADER, `precision highp float;varying vec2 vUv;uniform sampler2D uVelocity;uniform sampler2D uSource;uniform vec2 texelSize;uniform float dt;uniform float dissipation;vec4 bilerp(in sampler2D sam,in vec2 p){vec4 st;st.xy=floor(p-0.5)+0.5;st.zw=st.xy+1.;vec4 uv=st*texelSize.xyxy;vec4 a=texture2D(sam,uv.xy);vec4 b=texture2D(sam,uv.zy);vec4 c=texture2D(sam,uv.xw);vec4 d=texture2D(sam,uv.zw);vec2 f=p-st.xy;return mix(mix(a,b,f.x),mix(c,d,f.x),f.y);}void main(){vec2 coord=gl_FragCoord.xy-dt*texture2D(uVelocity,vUv).xy;gl_FragColor=dissipation*bilerp(uSource,coord);gl_FragColor.a=1.;}`);
    const advFrag        = compileShader(gl.FRAGMENT_SHADER, `precision highp float;varying vec2 vUv;uniform sampler2D uVelocity;uniform sampler2D uSource;uniform vec2 texelSize;uniform float dt;uniform float dissipation;void main(){vec2 coord=vUv-dt*texture2D(uVelocity,vUv).xy*texelSize;gl_FragColor=dissipation*texture2D(uSource,coord);gl_FragColor.a=1.;}`);
    const divFrag        = compileShader(gl.FRAGMENT_SHADER, `precision highp float;varying vec2 vUv;varying vec2 vL;varying vec2 vR;varying vec2 vT;varying vec2 vB;uniform sampler2D uVelocity;vec2 sampleV(in vec2 uv){vec2 m=vec2(1.);if(uv.x<0.){uv.x=0.;m.x=-1.;}if(uv.x>1.){uv.x=1.;m.x=-1.;}if(uv.y<0.){uv.y=0.;m.y=-1.;}if(uv.y>1.){uv.y=1.;m.y=-1.;}return m*texture2D(uVelocity,uv).xy;}void main(){float L=sampleV(vL).x;float R=sampleV(vR).x;float T=sampleV(vT).y;float B=sampleV(vB).y;gl_FragColor=vec4(.5*(R-L+T-B),0.,0.,1.);}`);
    const curlFrag       = compileShader(gl.FRAGMENT_SHADER, `precision highp float;varying vec2 vUv;varying vec2 vL;varying vec2 vR;varying vec2 vT;varying vec2 vB;uniform sampler2D uVelocity;void main(){float L=texture2D(uVelocity,vL).y;float R=texture2D(uVelocity,vR).y;float T=texture2D(uVelocity,vT).x;float B=texture2D(uVelocity,vB).x;gl_FragColor=vec4(R-L-T+B,0.,0.,1.);}`);
    const vortFrag       = compileShader(gl.FRAGMENT_SHADER, `precision highp float;varying vec2 vUv;varying vec2 vT;varying vec2 vB;uniform sampler2D uVelocity;uniform sampler2D uCurl;uniform float curl;uniform float dt;void main(){float T=texture2D(uCurl,vT).x;float B=texture2D(uCurl,vB).x;float C=texture2D(uCurl,vUv).x;vec2 force=vec2(abs(T)-abs(B),0.);force*=1./length(force+0.00001)*curl*C;vec2 vel=texture2D(uVelocity,vUv).xy;gl_FragColor=vec4(vel+force*dt,0.,1.);}`);
    const pressFrag      = compileShader(gl.FRAGMENT_SHADER, `precision highp float;varying vec2 vUv;varying vec2 vL;varying vec2 vR;varying vec2 vT;varying vec2 vB;uniform sampler2D uPressure;uniform sampler2D uDivergence;vec2 bnd(in vec2 uv){return min(max(uv,0.),1.);}void main(){float L=texture2D(uPressure,bnd(vL)).x;float R=texture2D(uPressure,bnd(vR)).x;float T=texture2D(uPressure,bnd(vT)).x;float B=texture2D(uPressure,bnd(vB)).x;float div=texture2D(uDivergence,vUv).x;gl_FragColor=vec4((L+R+B+T-div)*.25,0.,0.,1.);}`);
    const gradFrag       = compileShader(gl.FRAGMENT_SHADER, `precision highp float;varying vec2 vUv;varying vec2 vL;varying vec2 vR;varying vec2 vT;varying vec2 vB;uniform sampler2D uPressure;uniform sampler2D uVelocity;vec2 bnd(in vec2 uv){return min(max(uv,0.),1.);}void main(){float L=texture2D(uPressure,bnd(vL)).x;float R=texture2D(uPressure,bnd(vR)).x;float T=texture2D(uPressure,bnd(vT)).x;float B=texture2D(uPressure,bnd(vB)).x;vec2 vel=texture2D(uVelocity,vUv).xy;vel.xy-=vec2(R-L,T-B);gl_FragColor=vec4(vel,0.,1.);}`);

    // ── Programs ──────────────────────────────────────────────────────────────
    const clearProg      = new GLProgram(baseVert, clearFrag);
    const displayProg    = new GLProgram(baseVert, displayFrag);
    const splatProg      = new GLProgram(baseVert, splatFrag);
    const advectionProg  = new GLProgram(baseVert, ext.supportLinearFiltering ? advFrag : advManFrag);
    const divergenceProg = new GLProgram(baseVert, divFrag);
    const curlProg       = new GLProgram(baseVert, curlFrag);
    const vorticityProg  = new GLProgram(baseVert, vortFrag);
    const pressureProg   = new GLProgram(baseVert, pressFrag);
    const gradientProg   = new GLProgram(baseVert, gradFrag);

    // ── FBOs ──────────────────────────────────────────────────────────────────
    let textureWidth: number, textureHeight: number;
    let density: any, velocity: any, divergence: any, curlFBO: any, pressure: any;

    function createFBO(texId: number, w: number, h: number, internalFormat: any, format: any, type: any, param: any) {
      gl.activeTexture(gl.TEXTURE0 + texId);
      const tex = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, param);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, param);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, w, h, 0, format, type, null);
      const fbo = gl.createFramebuffer();
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);
      gl.viewport(0, 0, w, h);
      gl.clear(gl.COLOR_BUFFER_BIT);
      return [tex, fbo, texId];
    }

    function createDoubleFBO(texId: number, w: number, h: number, internalFormat: any, format: any, type: any, param: any) {
      let fbo1 = createFBO(texId,     w, h, internalFormat, format, type, param);
      let fbo2 = createFBO(texId + 1, w, h, internalFormat, format, type, param);
      return {
        get read()  { return fbo1; },
        get write() { return fbo2; },
        swap() { const t = fbo1; fbo1 = fbo2; fbo2 = t; },
      };
    }

    function initFramebuffers() {
      textureWidth  = gl.drawingBufferWidth  >> config.TEXTURE_DOWNSAMPLE;
      textureHeight = gl.drawingBufferHeight >> config.TEXTURE_DOWNSAMPLE;
      const { halfFloatTexType, formatRGBA, formatRG, formatR, supportLinearFiltering: slf } = ext;
      const LIN = slf ? gl.LINEAR : gl.NEAREST;
      density    = createDoubleFBO(2, textureWidth, textureHeight, formatRGBA.internalFormat, formatRGBA.format, halfFloatTexType, LIN);
      velocity   = createDoubleFBO(0, textureWidth, textureHeight, formatRG.internalFormat,   formatRG.format,   halfFloatTexType, LIN);
      divergence = createFBO(4, textureWidth, textureHeight, formatR.internalFormat, formatR.format, halfFloatTexType, gl.NEAREST);
      curlFBO    = createFBO(5, textureWidth, textureHeight, formatR.internalFormat, formatR.format, halfFloatTexType, gl.NEAREST);
      pressure   = createDoubleFBO(6, textureWidth, textureHeight, formatR.internalFormat, formatR.format, halfFloatTexType, gl.NEAREST);
    }
    initFramebuffers();

    // ── Blit ──────────────────────────────────────────────────────────────────
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,-1,1,1,1,1,-1]), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0,1,2,0,2,3]), gl.STATIC_DRAW);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(0);
    const blit = (dest: WebGLFramebuffer | null) => {
      gl.bindFramebuffer(gl.FRAMEBUFFER, dest);
      gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
    };

    // ── Splat ─────────────────────────────────────────────────────────────────
    function splat(x: number, y: number, dx: number, dy: number, color: number[]) {
      splatProg.bind();
      gl.uniform1i(splatProg.uniforms.uTarget, velocity.read[2]);
      gl.uniform1f(splatProg.uniforms.aspectRatio, canvas.width / canvas.height);
      gl.uniform2f(splatProg.uniforms.point, x / canvas.width, 1 - y / canvas.height);
      gl.uniform3f(splatProg.uniforms.color, dx, -dy, 1);
      gl.uniform1f(splatProg.uniforms.radius, config.SPLAT_RADIUS);
      blit(velocity.write[1]); velocity.swap();
      gl.uniform1i(splatProg.uniforms.uTarget, density.read[2]);
      gl.uniform3f(splatProg.uniforms.color, color[0] * 0.8, color[1] * 0.8, color[2] * 0.8);
      blit(density.write[1]); density.swap();
    }

    function multipleSplats(amount: number) {
      for (let i = 0; i < amount; i++) {
        splat(
          canvas.width  * Math.random(),
          canvas.height * Math.random(),
          1000 * (Math.random() - 0.5),
          1000 * (Math.random() - 0.5),
          // Very subtle gray-white tones — won't tint the page
          [0.05 + Math.random() * 0.08, 0.05 + Math.random() * 0.08, 0.05 + Math.random() * 0.08]
        );
      }
    }

    // ── Update loop ───────────────────────────────────────────────────────────
    let lastTime = Date.now();
    let rafId: number;
    multipleSplats(Math.floor(Math.random() * 20) + 5);

    function update() {
      if (canvas.width !== canvas.clientWidth || canvas.height !== canvas.clientHeight) {
        canvas.width  = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
        initFramebuffers();
      }

      const dt = Math.min((Date.now() - lastTime) / 1000, 0.016);
      lastTime = Date.now();
      gl.viewport(0, 0, textureWidth, textureHeight);

      if (splatStack.length > 0) multipleSplats(splatStack.pop());

      advectionProg.bind();
      gl.uniform2f(advectionProg.uniforms.texelSize, 1 / textureWidth, 1 / textureHeight);
      gl.uniform1i(advectionProg.uniforms.uVelocity, velocity.read[2]);
      gl.uniform1i(advectionProg.uniforms.uSource,   velocity.read[2]);
      gl.uniform1f(advectionProg.uniforms.dt,         dt);
      gl.uniform1f(advectionProg.uniforms.dissipation, config.VELOCITY_DISSIPATION);
      blit(velocity.write[1]); velocity.swap();

      gl.uniform1i(advectionProg.uniforms.uVelocity, velocity.read[2]);
      gl.uniform1i(advectionProg.uniforms.uSource,   density.read[2]);
      gl.uniform1f(advectionProg.uniforms.dissipation, config.DENSITY_DISSIPATION);
      blit(density.write[1]); density.swap();

      for (const p of pointers) {
        if (p.moved) { splat(p.x, p.y, p.dx, p.dy, p.color); p.moved = false; }
      }

      curlProg.bind();
      gl.uniform2f(curlProg.uniforms.texelSize, 1 / textureWidth, 1 / textureHeight);
      gl.uniform1i(curlProg.uniforms.uVelocity, velocity.read[2]);
      blit(curlFBO[1]);

      vorticityProg.bind();
      gl.uniform2f(vorticityProg.uniforms.texelSize, 1 / textureWidth, 1 / textureHeight);
      gl.uniform1i(vorticityProg.uniforms.uVelocity, velocity.read[2]);
      gl.uniform1i(vorticityProg.uniforms.uCurl,     curlFBO[2]);
      gl.uniform1f(vorticityProg.uniforms.curl,      config.CURL);
      gl.uniform1f(vorticityProg.uniforms.dt,        dt);
      blit(velocity.write[1]); velocity.swap();

      divergenceProg.bind();
      gl.uniform2f(divergenceProg.uniforms.texelSize, 1 / textureWidth, 1 / textureHeight);
      gl.uniform1i(divergenceProg.uniforms.uVelocity, velocity.read[2]);
      blit(divergence[1]);

      clearProg.bind();
      const pressTexId = pressure.read[2];
      gl.activeTexture(gl.TEXTURE0 + pressTexId);
      gl.bindTexture(gl.TEXTURE_2D, pressure.read[0]);
      gl.uniform1i(clearProg.uniforms.uTexture, pressTexId);
      gl.uniform1f(clearProg.uniforms.value, config.PRESSURE_DISSIPATION);
      blit(pressure.write[1]); pressure.swap();

      pressureProg.bind();
      gl.uniform2f(pressureProg.uniforms.texelSize, 1 / textureWidth, 1 / textureHeight);
      gl.uniform1i(pressureProg.uniforms.uDivergence, divergence[2]);
      gl.uniform1i(pressureProg.uniforms.uPressure,   pressure.read[2]);
      gl.activeTexture(gl.TEXTURE0 + pressure.read[2]);
      for (let i = 0; i < config.PRESSURE_ITERATIONS; i++) {
        gl.bindTexture(gl.TEXTURE_2D, pressure.read[0]);
        blit(pressure.write[1]); pressure.swap();
      }

      gradientProg.bind();
      gl.uniform2f(gradientProg.uniforms.texelSize, 1 / textureWidth, 1 / textureHeight);
      gl.uniform1i(gradientProg.uniforms.uPressure, pressure.read[2]);
      gl.uniform1i(gradientProg.uniforms.uVelocity, velocity.read[2]);
      blit(velocity.write[1]); velocity.swap();

      gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
      displayProg.bind();
      gl.uniform1i(displayProg.uniforms.uTexture, density.read[2]);
      blit(null);

      rafId = requestAnimationFrame(update);
    }
    update();

    // ── Events ────────────────────────────────────────────────────────────────
    const onMouseMove = (e: MouseEvent) => {
      pointers[0].moved = pointers[0].down;
      pointers[0].dx = (e.clientX - pointers[0].x) * 10;
      pointers[0].dy = (e.clientY - pointers[0].y) * 10;
      pointers[0].x  = e.clientX;
      pointers[0].y  = e.clientY;
      // Always create a gentle trail even without clicking
      pointers[0].moved = true;
      if (!pointers[0].color || !pointers[0].down) {
        // Very muted, near-white colors so they don't tint the page
        pointers[0].color = [0.4 + Math.random() * 0.5, 0.4 + Math.random() * 0.5, 0.4 + Math.random() * 0.5];
      }
    };
    const onMouseDown = (e: MouseEvent) => {
      pointers[0].down  = true;
      pointers[0].x     = e.clientX;
      pointers[0].y     = e.clientY;
      pointers[0].color = [0.5 + Math.random() * 0.5, 0.5 + Math.random() * 0.5, 0.5 + Math.random() * 0.5];
    };
    const onMouseUp = () => { pointers[0].down = false; };

    // Scroll — burst of splats around the cursor position on scroll
    let lastScrollY = window.scrollY;
    const onScroll = () => {
      const dy = window.scrollY - lastScrollY;
      lastScrollY = window.scrollY;
      if (Math.abs(dy) > 2) {
        splat(
          pointers[0].x || canvas.width / 2,
          pointers[0].y || canvas.height / 2,
          (Math.random() - 0.5) * 200,
          dy * 8,
          [0.4 + Math.random() * 0.5, 0.4 + Math.random() * 0.5, 0.4 + Math.random() * 0.5]
        );
      }
    };

    // Touch support
    const onTouchMove = (e: TouchEvent) => {
      const touches = e.targetTouches;
      for (let i = 0; i < touches.length; i++) {
        while (pointers.length <= i) pointers.push(new (PointerPrototype as any)());
        const p = pointers[i];
        p.moved = p.down;
        p.dx = (touches[i].clientX - p.x) * 10;
        p.dy = (touches[i].clientY - p.y) * 10;
        p.x  = touches[i].clientX;
        p.y  = touches[i].clientY;
        p.moved = true;
        p.color = [0.4 + Math.random() * 0.5, 0.4 + Math.random() * 0.5, 0.4 + Math.random() * 0.5];
      }
    };
    const onTouchStart = (e: TouchEvent) => {
      const touches = e.targetTouches;
      for (let i = 0; i < touches.length; i++) {
        while (pointers.length <= i) pointers.push(new (PointerPrototype as any)());
        pointers[i].down  = true;
        pointers[i].x     = touches[i].clientX;
        pointers[i].y     = touches[i].clientY;
        pointers[i].color = [0.5 + Math.random() * 0.5, 0.5 + Math.random() * 0.5, 0.5 + Math.random() * 0.5];
      }
    };
    const onTouchEnd = (e: TouchEvent) => {
      for (let i = 0; i < e.changedTouches.length; i++)
        for (let j = 0; j < pointers.length; j++)
          if (e.changedTouches[i].identifier === pointers[j].id)
            pointers[j].down = false;
    };

    window.addEventListener('mousemove',  onMouseMove);
    window.addEventListener('mousedown',  onMouseDown);
    window.addEventListener('mouseup',    onMouseUp);
    window.addEventListener('scroll',     onScroll,    { passive: true });
    window.addEventListener('touchmove',  onTouchMove, { passive: true });
    window.addEventListener('touchstart', onTouchStart,{ passive: true });
    window.addEventListener('touchend',   onTouchEnd);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove',  onMouseMove);
      window.removeEventListener('mousedown',  onMouseDown);
      window.removeEventListener('mouseup',    onMouseUp);
      window.removeEventListener('scroll',     onScroll);
      window.removeEventListener('touchmove',  onTouchMove);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend',   onTouchEnd);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0, left: 0,
        width:  '100vw',
        height: '100vh',
        zIndex: 9999,
        pointerEvents: 'none',
        opacity: 1,
      }}
    />
  );
}
