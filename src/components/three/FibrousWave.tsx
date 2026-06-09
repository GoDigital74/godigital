"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  varying float vWave;
  uniform float uTime;

  void main() {
    vUv = uv;
    vec3 pos = position;

    float w1 = sin(pos.x * 0.65 + uTime * 0.55) * 0.55;
    float w2 = cos(pos.y * 0.85 + uTime * 0.42) * 0.4;
    float w3 = sin(pos.x * 1.8 - pos.y * 1.2 + uTime * 0.9) * 0.22;
    float wave = w1 + w2 + w3;

    pos.z += wave;
    pos.y += sin(pos.x * 0.35 + uTime * 0.3) * 0.18;

    vWave = wave;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  varying vec2 vUv;
  varying float vWave;
  uniform float uTime;

  void main() {
    float strands = sin(vUv.y * 280.0 + vWave * 18.0 + uTime * 2.2) * 0.5 + 0.5;
    strands *= sin(vUv.x * 200.0 - uTime * 1.6 + vUv.y * 35.0) * 0.5 + 0.5;
    strands = pow(strands, 1.35);

    float along = smoothstep(0.0, 1.0, vUv.x + sin(vUv.y * 5.0 + uTime * 0.2) * 0.06);
    float edge = smoothstep(0.0, 1.0, 1.0 - abs(vUv.y - 0.5) * 1.6);

    vec3 deep = vec3(0.03, 0.1, 0.32);
    vec3 royal = vec3(0.1, 0.32, 0.82);
    vec3 cyan = vec3(0.38, 0.74, 1.0);
    vec3 white = vec3(0.82, 0.92, 1.0);

    vec3 color = mix(deep, royal, along);
    color = mix(color, cyan, strands * 0.7 * edge);
    color = mix(color, white, strands * 0.35 * along);

    float alpha = 0.98 * edge;
    gl_FragColor = vec4(color, alpha);
  }
`;

type FibrousWaveProps = {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number, number];
};

export function FibrousWave({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = [1, 1, 1],
}: FibrousWaveProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
    }),
    []
  );

  useFrame((state) => {
    if (meshRef.current) {
      const mat = meshRef.current.material as THREE.ShaderMaterial;
      mat.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh ref={meshRef} position={position} rotation={rotation} scale={scale}>
      <planeGeometry args={[22, 14, 200, 120]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </mesh>
  );
}
