// "use client";

// import { useRef } from "react";
// import { Canvas, useFrame } from "@react-three/fiber";
// import * as THREE from "three";
// import { FlowingRibbon } from "./FlowingRibbon";

// function CTARibbonGroup() {
//   const groupRef = useRef<THREE.Group>(null);

//   useFrame((state) => {
//     if (groupRef.current) {
//       const t = state.clock.elapsedTime;
//       groupRef.current.rotation.z = Math.sin(t * 0.1) * 0.06;
//       groupRef.current.position.x = Math.sin(t * 0.2) * 0.2;
//     }
//   });

//   return (
//     <group ref={groupRef} position={[0, 0, 0]} rotation={[0.1, 0, 0]}>
//       <FlowingRibbon
//         position={[0, 0, 0]}
//         scale={[1.4, 0.9, 1]}
//         intensity={0.35}
//       />
//       <FlowingRibbon
//         position={[0.5, -0.3, -0.8]}
//         rotation={[0, 0, 0.2]}
//         scale={[1.1, 0.7, 1]}
//         intensity={0.2}
//       />
//     </group>
//   );
// }

// export function CTAScene() {
//   return (
//     <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[2.5rem]">
//       <Canvas
//         camera={{ position: [0, 0, 5], fov: 50 }}
//         dpr={[1, 1.5]}
//         gl={{ antialias: true, alpha: true }}
//         style={{ background: "transparent" }}
//       >
//         <ambientLight intensity={0.3} />
//         <pointLight position={[2, 2, 3]} intensity={0.5} color="#60a5fa" />
//         <CTARibbonGroup />
//       </Canvas>
//       <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/80 to-brand-navy/60" />
//     </div>
//   );
// }
