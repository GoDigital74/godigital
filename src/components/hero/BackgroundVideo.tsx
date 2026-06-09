// "use client";

// import { useEffect, useRef } from "react";
// import Hls from "hls.js";

// const HLS_URL =
//   "https://stream.mux.com/kimF2ha9zLrX64H00UgLGPflCzNtl1T0215MlAmeOztv8.m3u8";

// export function BackgroundVideo() {
//   const videoRef = useRef<HTMLVideoElement>(null);

//   useEffect(() => {
//     const video = videoRef.current;
//     if (!video) return;

//     let hls: Hls | null = null;

//     if (video.canPlayType("application/vnd.apple.mpegurl")) {
//       video.src = HLS_URL;
//     } else if (Hls.isSupported()) {
//       hls = new Hls();
//       hls.loadSource(HLS_URL);
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
//         className="h-full w-full object-cover opacity-100"
//       />
//       <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-blue-950/50 to-black/85" />
//       <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.45)_100%)]" />
//     </div>
//   );
// }
