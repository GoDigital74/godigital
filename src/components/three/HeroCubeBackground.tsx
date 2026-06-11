// "use client";

// import { useRef, useMemo, useEffect, useState } from "react";
// import { Canvas, useFrame, useThree } from "@react-three/fiber";
// import { EffectComposer, Bloom } from "@react-three/postprocessing";
// import * as THREE from "three";

// // ─── Constants ────────────────────────────────────────────────────
// const GRID_X = 18;
// const GRID_Y = 11;
// const TOTAL = GRID_X * GRID_Y;
// const CUBE_SIZE = 2.8;       // Large, clearly visible cubes
// const CUBE_DEPTH = 3.0;      // Deep cubes for strong edge definition
// const GAP = 3.1;             // Spacing — grid spans ~53 units, fills full viewport
// const WAVE_AMP = 2.5;        // Strong Z-displacement (front/back of screen)
// const WAVE_SPEED = 0.6;      // Slow, cinematic breathing


// // ─── Instanced Cube Wall ──────────────────────────────────────────
// function CubeWall() {
//   const meshRef = useRef<THREE.InstancedMesh>(null!);
//   const mouseLightRef = useRef<THREE.PointLight>(null!);
//   const { viewport, pointer } = useThree();



//   // Temp object for matrix composition
//   const tempObj = useMemo(() => new THREE.Object3D(), []);

//   // Pre-compute grid offsets (centered) + per-cube random phase
//   const gridData = useMemo(() => {
//     const arr: { ox: number; oy: number; phase: number; scaleVar: number }[] = [];
//     const halfX = ((GRID_X - 1) * GAP) / 2;
//     const halfY = ((GRID_Y - 1) * GAP) / 2;

//     // Seeded pseudo-random for consistency
//     const seededRandom = (i: number) => {
//       const x = Math.sin(i * 127.1 + 311.7) * 43758.5453;
//       return x - Math.floor(x);
//     };

//     for (let y = 0; y < GRID_Y; y++) {
//       for (let x = 0; x < GRID_X; x++) {
//         const idx = y * GRID_X + x;
//         arr.push({
//           ox: x * GAP - halfX,
//           oy: y * GAP - halfY,
//           phase: seededRandom(idx) * Math.PI * 2,
//           scaleVar: 0.85 + seededRandom(idx + 999) * 0.3, // Slight size variation
//         });
//       }
//     }
//     return arr;
//   }, []);

//   // Set initial positions
//   useEffect(() => {
//     const mesh = meshRef.current;
//     if (!mesh) return;
//     for (let i = 0; i < TOTAL; i++) {
//       const { ox, oy, scaleVar } = gridData[i];
//       tempObj.position.set(ox, oy, 0);
//       tempObj.scale.set(scaleVar, scaleVar, 1);
//       tempObj.updateMatrix();
//       mesh.setMatrixAt(i, tempObj.matrix);
//     }
//     mesh.instanceMatrix.needsUpdate = true;
//   }, [gridData, tempObj]);

//   useFrame((state) => {
//     const mesh = meshRef.current;
//     const mouseLight = mouseLightRef.current;
//     if (!mesh) return;

//     const t = state.clock.elapsedTime * WAVE_SPEED;

//     // Set mouse light position directly (no lerp = instant response)
//     const mx = pointer.x * viewport.width * 0.5;
//     const my = pointer.y * viewport.height * 0.5;

//     // Mouse-tracking light positioned BEHIND the cubes for under-glow
//     if (mouseLight) {
//       mouseLight.position.set(mx, my, -2);
//     }

//     // Update each instance Z position (breathing front/back)
//     for (let i = 0; i < TOTAL; i++) {
//       const { ox, oy, phase, scaleVar } = gridData[i];

//       // Multi-frequency wave for organic, non-uniform breathing
//       const wave1 = Math.sin(ox * 0.25 + t + phase) * Math.cos(oy * 0.25 + t * 0.6);
//       const wave2 = Math.sin(ox * 0.12 - t * 0.4 + phase * 0.5) * Math.cos(oy * 0.18 + t * 0.25);
//       const wave3 = Math.sin((ox + oy) * 0.1 + t * 0.3) * 0.4;
//       const z = (wave1 + wave2 * 0.6 + wave3) * WAVE_AMP;

//       tempObj.position.set(ox, oy, z);
//       tempObj.scale.set(scaleVar, scaleVar, 1);
//       tempObj.updateMatrix();
//       mesh.setMatrixAt(i, tempObj.matrix);
//     }

//     mesh.instanceMatrix.needsUpdate = true;
//   });

//   return (
//     <>
//       {/* ── FIXED SCENE LIGHTS ── */}

//       {/* Primary key light from upper-left corner — bright, makes cube faces & edges visible */}
//       <pointLight
//         position={[-22, 18, 15]}
//         color="#d0d4e0"
//         intensity={1200}
//         distance={80}
//         decay={1.8}
//       />

//       {/* Secondary strong fill from upper-right */}
//       <pointLight
//         position={[22, 12, 14]}
//         color="#b8bcc8"
//         intensity={600}
//         distance={70}
//         decay={1.8}
//       />

//       {/* Bottom fill — prevents lower cubes from going pure black */}
//       <pointLight
//         position={[0, -15, 10]}
//         color="#8888a0"
//         intensity={300}
//         distance={50}
//         decay={2}
//       />

//       {/* Strong top-down directional — overall cube visibility */}
//       <directionalLight
//         position={[0, 20, 10]}
//         intensity={1.2}
//         color="#9090a8"
//       />

//       {/* Front-facing fill directional — illuminates faces toward camera */}
//       <directionalLight
//         position={[0, 0, 20]}
//         intensity={0.5}
//         color="#707088"
//       />

//       {/* ── MOUSE-TRACKING BLUE LIGHT (behind cubes = under-glow) ── */}
//       <pointLight
//         ref={mouseLightRef}
//         color="#6495ED"
//         intensity={600}
//         distance={20}
//         decay={2}
//       />

//       {/* Secondary front blue glow (subtle, follows mouse too) */}
//       <pointLight
//         position={[0, 0, 8]}
//         color="#6495ED"
//         intensity={0}
//         distance={15}
//         decay={2}
//         ref={(light) => {
//           // We'll update this in useFrame via the parent light
//           if (light && mouseLightRef.current) {
//             // This is the front-face fill — updated in a secondary effect
//           }
//         }}
//       />

//       {/* ── INSTANCED CUBE WALL ── */}
//       <instancedMesh
//         ref={meshRef}
//         args={[undefined, undefined, TOTAL]}
//         frustumCulled={false}
//         castShadow
//         receiveShadow
//       >
//         <boxGeometry args={[CUBE_SIZE, CUBE_SIZE, CUBE_DEPTH]} />
//         <meshStandardMaterial
//           color="#2a2a32"
//           metalness={0.75}
//           roughness={0.4}
//           envMapIntensity={0.6}
//         />
//       </instancedMesh>
//     </>
//   );
// }

// // ─── Mouse Blue Front Light (separate component for clean ref) ────
// function MouseFrontLight() {
//   const lightRef = useRef<THREE.PointLight>(null!);
//   const { viewport, pointer } = useThree();

//   useFrame(() => {
//     if (!lightRef.current) return;
//     // Instant cursor tracking — no lerp delay
//     lightRef.current.position.set(
//       pointer.x * viewport.width * 0.5,
//       pointer.y * viewport.height * 0.5,
//       6
//     );
//   });

//   return (
//     <pointLight
//       ref={lightRef}
//       color="#6495ED"
//       intensity={150}
//       distance={16}
//       decay={2}
//     />
//   );
// }

// // ─── Scene ────────────────────────────────────────────────────────
// function Scene() {
//   return (
//     <>
//       {/* Ambient light — base visibility for all cubes */}
//       <ambientLight intensity={0.4} color="#1a1a28" />

//       <CubeWall />
//       <MouseFrontLight />

//       {/* Post-processing: bloom on the blue light reflections */}
//       <EffectComposer>
//         <Bloom
//           intensity={0.8}
//           luminanceThreshold={0.12}
//           luminanceSmoothing={0.95}
//           mipmapBlur
//         />
//       </EffectComposer>
//     </>
//   );
// }

// // ─── Responsive Camera ───────────────────────────────────────────
// function ResponsiveCamera() {
//   const { camera, size } = useThree();

//   useEffect(() => {
//     if (camera instanceof THREE.PerspectiveCamera) {
//       const aspect = size.width / size.height;
//       // Wider FOV on mobile to show entire grid
//       if (aspect < 1) {
//         camera.fov = 75;
//       } else if (aspect < 1.4) {
//         camera.fov = 60;
//       } else {
//         camera.fov = 50;
//       }
//       camera.updateProjectionMatrix();
//     }
//   }, [camera, size]);

//   return null;
// }

// // ─── Exported Canvas Wrapper ──────────────────────────────────────
// export function HeroCubeBackground() {
//   const [mounted, setMounted] = useState(false);
//   useEffect(() => setMounted(true), []);

//   const dpr = useMemo(() => {
//     if (typeof window === "undefined") return 1;
//     return Math.min(window.devicePixelRatio, 1.5);
//   }, []);

//   if (!mounted) {
//     return <div className="absolute inset-0 bg-[#0d1117]" />;
//   }

//   return (
//     <div className="absolute inset-0">
//       <Canvas
//         dpr={dpr}
//         gl={{
//           antialias: false,
//           powerPreference: "high-performance",
//           alpha: false,
//         }}
//         camera={{ position: [0, 0, 28], fov: 50, near: 0.1, far: 120 }}
//         style={{ background: "#0A0A0A" }}
//         frameloop="always"
//       >
//         <ResponsiveCamera />
//         <Scene />
//       </Canvas>
//     </div>
//   );
// }
