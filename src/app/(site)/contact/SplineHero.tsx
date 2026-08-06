import SplineNext from "@splinetool/react-spline/next";

const SPLINE_SCENE = "https://prod.spline.design/HhL1lucP5Lk85bd7/scene.splinecode";

// Server component: fetches Spline's tiny blurhash preview at request time (cached
// in production) and renders it as an instant, zero-JS placeholder while the actual
// WebGL scene + runtime (several hundred KB) loads in behind it on the client.
export function SplineHero() {
  return (
    <>
      <link rel="preconnect" href="https://prod.spline.design" />
      <link rel="preconnect" href="https://www.gstatic.com" crossOrigin="anonymous" />
      <SplineNext scene={SPLINE_SCENE} className="w-full h-full object-contain" />
    </>
  );
}
