// "use client";

// import { useRef, useMemo } from "react";
// import { useFrame } from "@react-three/fiber";
// import * as THREE from "three";

// const vertexShader = /* glsl */ `
//   varying vec2 vUv;
//   varying float vElevation;
//   uniform float uTime;

//   void main() {
//     vUv = uv;
//     vec3 pos = position;

//     float wave1 = sin(pos.x * 0.9 + uTime * 0.7) * 0.45;
//     float wave2 = cos(pos.y * 1.1 + uTime * 0.5) * 0.35;
//     float wave3 = sin(pos.x * 2.2 - pos.y * 1.5 + uTime * 1.1) * 0.18;
//     float elevation = wave1 + wave2 + wave3;

//     pos.z += elevation;
//     pos.y += sin(pos.x * 0.4 + uTime * 0.35) * 0.15;

//     vElevation = elevation;
//     gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
//   }
// `;

// const fragmentShader = /* glsl */ `
//   varying vec2 vUv;
//   varying float vElevation;
//   uniform float uTime;
//   uniform float uIntensity;

//   void main() {
//     float fibers = sin(vUv.x * 180.0 + vElevation * 12.0 + uTime * 1.8) * 0.5 + 0.5;
//     fibers *= sin(vUv.y * 140.0 - uTime * 1.2 + vUv.x * 40.0) * 0.5 + 0.5;
//     fibers = pow(fibers, 1.4);

//     float gradient = smoothstep(0.0, 1.0, vUv.y + sin(vUv.x * 6.28 + uTime * 0.25) * 0.12);
//     gradient += vElevation * 0.35;

//     vec3 deep = vec3(0.04, 0.12, 0.38);
//     vec3 mid = vec3(0.12, 0.42, 0.92);
//     vec3 bright = vec3(0.45, 0.78, 1.0);

//     vec3 color = mix(deep, mid, gradient);
//     color = mix(color, bright, fibers * 0.55 * uIntensity);
//     color += vec3(0.02, 0.06, 0.12) * vElevation;

//     gl_FragColor = vec4(color, 0.94);
//   }
// `;

// type FlowingRibbonProps = {
//   position?: [number, number, number];
//   rotation?: [number, number, number];
//   scale?: [number, number, number];
//   intensity?: number;
// };

// export function FlowingRibbon({
//   position = [0, 0, 0],
//   rotation = [0, 0, 0],
//   scale = [1, 1, 1],
//   intensity = 1,
// }: FlowingRibbonProps) {
//   const meshRef = useRef<THREE.Mesh>(null);

//   const uniforms = useMemo(
//     () => ({
//       uTime: { value: 0 },
//       uIntensity: { value: intensity },
//     }),
//     [intensity]
//   );

//   useFrame((state) => {
//     if (meshRef.current) {
//       const material = meshRef.current.material as THREE.ShaderMaterial;
//       material.uniforms.uTime.value = state.clock.elapsedTime;
//     }
//   });

//   return (
//     <mesh ref={meshRef} position={position} rotation={rotation} scale={scale}>
//       <planeGeometry args={[16, 10, 160, 100]} />
//       <shaderMaterial
//         vertexShader={vertexShader}
//         fragmentShader={fragmentShader}
//         uniforms={uniforms}
//         transparent
//         side={THREE.DoubleSide}
//         depthWrite={false}
//       />
//     </mesh>
//   );
// }
