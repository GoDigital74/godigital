// "use client";

// import { useEffect, useRef } from "react";
// import Hls from "hls.js";
// import { HeroLightEffect } from "./HeroLightEffect";

// const HLS_SRC =
//   "https://stream.mux.com/kimF2ha9zLrX64H00UgLGPflCzNtl1T0215MlAmeOztv8.m3u8";

// export function BackgroundVideo() {
//   const videoRef = useRef<HTMLVideoElement>(null);

//   useEffect(() => {
//     const video = videoRef.current;
//     if (!video) return;

//     let hls: Hls | null = null;

//     if (video.canPlayType("application/vnd.apple.mpegurl")) {
//       video.src = HLS_SRC;
//     } else if (Hls.isSupported()) {
//       hls = new Hls();
//       hls.loadSource(HLS_SRC);
//       hls.attachMedia(video);
//     }

//     return () => {
//       hls?.destroy();
//     };
//   }, []);

//   return (
//     <div className="pointer-events-none absolute inset-0 overflow-hidden">
//       <video
//         ref={videoRef}
//         autoPlay
//         muted
//         loop
//         playsInline
//         className="h-full w-full object-cover opacity-90 brightness-[1.05] saturate-[1.08]"
//       />

//       {/* Base blue grade — even, not white */}
//       <div className="absolute inset-0 bg-gradient-to-br from-[#3b6fa8]/45 via-[#4a85c4]/35 to-[#2d5f96]/50" />

//       <HeroLightEffect />
//     </div>
//   );
// }
