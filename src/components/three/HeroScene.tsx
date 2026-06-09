// "use client";

// import { useRef } from "react";
// import { Canvas, useFrame } from "@react-three/fiber";
// import * as THREE from "three";
// import { FibrousWave } from "./FibrousWave";

// function WaveGroup() {
//   const groupRef = useRef<THREE.Group>(null);

//   useFrame((state) => {
//     if (!groupRef.current) return;
//     const t = state.clock.elapsedTime;
//     groupRef.current.position.y = Math.sin(t * 0.18) * 0.1;
//     groupRef.current.rotation.z = -0.52 + Math.sin(t * 0.1) * 0.02;
//   });

//   return (
//     <group ref={groupRef} position={[0.5, -0.3, 0]} rotation={[0.15, -0.1, -0.52]}>
//       <FibrousWave scale={[1.05, 1, 1]} />
//       <FibrousWave
//         position={[0.3, -0.4, -1.5]}
//         rotation={[0, 0, 0.08]}
//         scale={[0.75, 0.85, 1]}
//       />
//       <FibrousWave
//         position={[-0.5, 0.5, -2.5]}
//         rotation={[0.05, 0, -0.1]}
//         scale={[0.55, 0.7, 1]}
//       />
//     </group>
//   );
// }

// export function HeroScene() {
//   return (
//     <div className="absolute inset-0">
//       <Canvas
//         camera={{ position: [0, 0, 10], fov: 36 }}
//         dpr={[1, 1.75]}
//         gl={{ antialias: true, alpha: true }}
//         style={{ background: "transparent" }}
//       >
//         <ambientLight intensity={0.6} />
//         <directionalLight position={[5, 8, 6]} intensity={1.2} color="#ffffff" />
//         <pointLight position={[-3, 2, 4]} intensity={0.6} color="#93c5fd" />
//         <pointLight position={[4, -2, 3]} intensity={0.4} color="#1d4ed8" />
//         <WaveGroup />
//       </Canvas>
//     </div>
//   );
// }
