import React, { useMemo, useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// Import the texture directly from our assets
import tshirtImg from '../assets/images/black_tshirt_smokey_1782037316227.jpg';

interface WavingTshirtMeshProps {
  texture: THREE.Texture;
}

function WavingTshirtMesh({ texture }: WavingTshirtMeshProps) {
  const meshRef = useRef<THREE.Mesh | null>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const { viewport } = useThree();

  const vertexShader = `
    varying vec2 vUv;
    varying vec3 vPosition;
    varying vec3 vNormal;
    uniform float u_time;

    void main() {
      vUv = uv;
      vec3 pos = position;
      
      float wave1 = sin(pos.x * 2.4 + u_time * 0.45) * cos(pos.y * 2.0 + u_time * 0.35) * 0.14;
      float wave2 = cos(pos.x * 3.5 - u_time * 0.25) * sin(pos.y * 2.8 + u_time * 0.3) * 0.06;
      float wave3 = sin(pos.y * 5.2 + u_time * 0.4) * 0.025;
      
      pos.z += wave1 + wave2 + wave3;
      
      float distFromCenter = length(uv - vec2(0.5));
      pos.z += (1.0 - pow(distFromCenter * 2.0, 2.0)) * 0.08;

      vPosition = pos;
      vNormal = normal;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `;

  const fragmentShader = `
    varying vec2 vUv;
    varying vec3 vPosition;
    uniform sampler2D u_texture;
    uniform float u_time;
    uniform float u_aspect;
    uniform float u_textureAspect;

    void main() {
      vec2 uv = vUv;
      
      if (u_aspect > u_textureAspect) {
        float diff = u_textureAspect / u_aspect;
        uv.y = (uv.y - 0.5) * diff + 0.5;
      } else if (u_aspect < u_textureAspect) {
        float diff = u_aspect / u_textureAspect;
        uv.x = (uv.x - 0.5) * diff + 0.5;
      }
      
      uv.x += sin(uv.y * 6.0 + u_time * 0.22) * 0.0018;
      uv.y += cos(uv.x * 6.0 + u_time * 0.22) * 0.0018;
      
      vec4 col = texture2D(u_texture, uv);
      
      float redAccent = col.r / (col.g + col.b + 0.01);
      if (col.r > 0.15 && redAccent > 1.25) {
        float dynamicPulse = sin(u_time * 0.8) * 0.5 + 0.5;
        col.rgb += vec3(0.26, 0.04, 0.04) * dynamicPulse * 1.2;
      }
      
      gl_FragColor = col;
    }
  `;

  const uniforms = useMemo(() => {
    return {
      u_time: { value: 0 },
      u_texture: { value: texture },
      u_aspect: { value: viewport.width / viewport.height },
      u_textureAspect: { value: 16.0 / 9.0 },
    };
  }, [texture, viewport.width, viewport.height]);

  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.uniforms.u_aspect.value = viewport.width / viewport.height;
    }
  }, [viewport.width, viewport.height]);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.u_time.value = state.clock.getElapsedTime();
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[viewport.width, viewport.height, 120, 120]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

export default function Hero() {
  const [loadedTexture, setLoadedTexture] = useState<THREE.Texture | null>(null);

  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.load(
      tshirtImg,
      (tex) => {
        tex.wrapS = THREE.ClampToEdgeWrapping;
        tex.wrapT = THREE.ClampToEdgeWrapping;
        tex.minFilter = THREE.LinearFilter;
        tex.magFilter = THREE.LinearFilter;
        setLoadedTexture(tex);
      },
      undefined,
      (err) => {
        console.error('Error loading texture: ', err);
      }
    );
  }, []);

  return (
    <section className="relative w-full h-[100dvh] bg-[#020205] text-slate-100 overflow-hidden select-none" id="full-viewport-shader">
      {!loadedTexture ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4 bg-[#020205]">
          <div className="w-10 h-10 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
          <span className="font-mono text-[10px] tracking-[0.25em] text-red-500 uppercase animate-pulse">
            Loading shader matrix...
          </span>
        </div>
      ) : (
        <Canvas
          camera={{ position: [0, 0, 1.0], fov: 75 }}
          gl={{ antialias: true, preserveDrawingBuffer: false, powerPreference: 'high-performance' }}
          style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
        >
          <ambientLight intensity={1.5} />
          <WavingTshirtMesh texture={loadedTexture} />
        </Canvas>
      )}
      
      <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center z-10 overflow-hidden px-4">
        {/* Large KB Background Text */}
        <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none opacity-40">
          <span className="text-[6rem] sm:text-[8rem] md:text-[12rem] lg:text-[16rem] font-black text-gray-500 leading-none select-none mix-blend-overlay">
            KB
          </span>
        </div>

        {/* Foreground Text */}
        <div className="relative z-10 flex flex-col items-center text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-widest uppercase text-white mix-blend-overlay opacity-90 drop-shadow-2xl">
            Klar Berlin
          </h1>
          <p className="mt-2 md:mt-3 text-[8px] sm:text-[10px] md:text-xs lg:text-sm font-medium tracking-[0.2em] sm:tracking-[0.3em] uppercase text-gray-300">
            The New Dimension
          </p>
        </div>
      </div>
    </section>
  );
}
