import { ImageResponse } from 'next/og';
import { client } from '@/sanity/lib/client';

// Next.js config for the image size and type
export const runtime = 'edge';
export const alt = 'GoDigital Agency Insight';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  // 1. Extract the slug safely (Next.js 15 standard)
  const { slug } = await params;

  // 2. Fetch JUST the title of this specific post from Sanity
  const query = `*[_type == "post" && slug.current == $slug][0]{ title }`;
  const post = await client.fetch(query, { slug });

  // Fallback title just in case
  const title = post?.title || 'Strategic Insights & Digital Growth';

  // 3. Draw the image using HTML and inline CSS!
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0A0A0A', // Dark background
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '80px',
          borderTop: '16px solid #6495ED', // Your brand blue accent line
        }}
      >
        {/* Top Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span
            style={{
              color: '#6495ED',
              fontSize: 32,
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            GoDigital Agency
          </span>
          <span style={{ color: '#555555', fontSize: 32, fontWeight: 500 }}>
            / Insights
          </span>
        </div>

        {/* Dynamic Post Title */}
        <div
          style={{
            display: 'flex',
            color: 'white',
            fontSize: 72,
            fontWeight: 800,
            lineHeight: 1.1,
            maxWidth: '900px',
          }}
        >
          {title}
        </div>

        {/* Bottom Website Tag */}
        <div style={{ display: 'flex', color: '#888888', fontSize: 28 }}>
          godigitalagency.in
        </div>
      </div>
    ),
    // Pass the size options we defined at the top
    { ...size }
  );
}