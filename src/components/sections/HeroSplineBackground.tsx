
"use client";

import dynamic from "next/dynamic";

const Spline = dynamic(
  () => import("@splinetool/react-spline").then((mod) => mod.default),
  {
    ssr: false,
    loading: () => <div className="absolute inset-0 bg-hero-bg" />,
  }
);

const SPLINE_SCENE =
  "https://prod.spline.design/Slk6b8kz3LRlKiyk/scene.splinecode";

export function HeroSplineBackground() {
  return (
    <div className="absolute inset-0">
      <Spline 
        scene={SPLINE_SCENE} 
        // We added hue-rotate-[120deg] to shift the green hover to blue
        className="h-full w-full hue-rotate-[120deg]" 
      />
    </div>
  );
}