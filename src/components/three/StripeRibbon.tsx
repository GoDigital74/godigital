// "use client";

// import { useRef, useMemo } from "react";
// import { useFrame } from "@react-three/fiber";
// import * as THREE from "three";

// const vertexShader = /* glsl */ `
//   varying vec2 vUv;
//   varying float vAlong;
//   uniform float uTime;

//   void main() {
//     vUv = uv;
//     vAlong = uv.x;
//     vec3 pos = position;

//     float ripple = sin(uv.x * 8.0 + uTime * 1.2) * 0.08;
//     ripple += cos(uv.y * 6.0 + uTime * 0.9) * 0.06;
//     pos += normal * ripple;

//     gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
//   }
// `;

// const fragmentShader = /* glsl */ `
//   varying vec2 vUv;
//   varying float vAlong;
//   uniform float uTime;

//   void main() {
//     float strands = sin(vUv.y * 220.0 + vAlong * 30.0 + uTime * 2.5) * 0.5 + 0.5;
//     strands *= sin(vUv.x * 160.0 - uTime * 1.8 + vUv.y * 20.0) * 0.5 + 0.5;
//     strands = pow(strands, 1.6);

//     float sweep = smoothstep(0.0, 1.0, vAlong + sin(vUv.y * 4.0 + uTime * 0.3) * 0.08);
//     float depth = smoothstep(0.0, 1.0, 1.0 - abs(vUv.y - 0.5) * 1.8);

//     vec3 navy = vec3(0.02, 0.08, 0.28);
//     vec3 royal = vec3(0.08, 0.28, 0.78);
//     vec3 cyan = vec3(0.35, 0.72, 1.0);
//     vec3 highlight = vec3(0.65, 0.88, 1.0);

//     vec3 color = mix(navy, royal, sweep);
//     color = mix(color, cyan, strands * 0.65 * depth);
//     color = mix(color, highlight, strands * 0.25 * sweep);

//     float alpha = 0.97 * depth;
//     gl_FragColor = vec4(color, alpha);
//   }
// `;

// export function StripeRibbon() {
//   const meshRef = useRef<THREE.Mesh>(null);

//   const { geometry, uniforms } = useMemo(() => {
//     const curve = new THREE.CatmullRomCurve3([
//       new THREE.Vector3(-5.5, 2.8, -1.5),
//       new THREE.Vector3(-2.5, 1.2, 0.5),
//       new THREE.Vector3(0.5, -0.2, 1.2),
//       new THREE.Vector3(3.5, -1.2, 0.8),
//       new THREE.Vector3(6.5, 0.5, -0.8),
//       new THREE.Vector3(8, 2.2, -2),
//     ]);

//     const geo = new THREE.TubeGeometry(curve, 200, 1.35, 32, false);
//     return {
//       geometry: geo,
//       uniforms: { uTime: { value: 0 } },
//     };
//   }, []);

//   useFrame((state) => {
//     if (meshRef.current) {
//       const mat = meshRef.current.material as THREE.ShaderMaterial;
//       mat.uniforms.uTime.value = state.clock.elapsedTime;
//     }
//   });

//   return (
//     <mesh ref={meshRef} geometry={geometry} rotation={[0.1, -0.25, -0.45]}>
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
