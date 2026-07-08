import { client } from "@/sanity/lib/client";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PortableText } from "@portabletext/react";
import urlBuilder from "@sanity/image-url";

// Helper to generate image URLs for inline Sanity images
const builder = urlBuilder(client);
function urlFor(source: any) {
  return builder.image(source);
}

// Custom components to perfectly style Sanity Rich Text
const ptComponents = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset?._ref) return null;
     return (
        // Changed to a responsive aspect ratio instead of fixed heights
        <div className="relative w-full aspect-[16/9] md:aspect-[2/1] my-10 rounded-2xl overflow-hidden shadow-sm border border-gray-100 bg-gray-50">
          <Image
            src={urlFor(value).url()}
            alt={value.alt || "Blog image"}
            fill
            // CHANGED: object-cover is now object-contain
            className="object-contain p-2"
          />
        </div>
      );
    },
  },
  block: {
    h1: ({ children }: any) => <h1 className="text-4xl md:text-5xl font-serif text-[#0A0A0A] mt-12 mb-6">{children}</h1>,
    h2: ({ children }: any) => <h2 className="text-3xl font-serif text-[#0A0A0A] mt-10 mb-4">{children}</h2>,
    h3: ({ children }: any) => <h3 className="text-2xl font-bold text-[#0A0A0A] mt-8 mb-4">{children}</h3>,
    normal: ({ children }: any) => <p className="text-lg text-gray-700 leading-relaxed mb-6">{children}</p>,
    blockquote: ({ children }: any) => <blockquote className="border-l-4 border-[#6495ED] pl-6 italic text-xl text-gray-600 my-8">{children}</blockquote>,
  },
  list: {
    bullet: ({ children }: any) => <ul className="list-disc pl-6 mb-8 text-lg text-gray-700 space-y-2">{children}</ul>,
    number: ({ children }: any) => <ol className="list-decimal pl-6 mb-8 text-lg text-gray-700 space-y-2">{children}</ol>,
  },
  marks: {
    strong: ({ children }: any) => <strong className="font-bold text-[#0A0A0A]">{children}</strong>,
    em: ({ children }: any) => <em className="italic">{children}</em>,
    link: ({ children, value }: any) => {
      const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined;
      return <a href={value.href} rel={rel} className="text-[#6495ED] underline underline-offset-4 font-semibold">{children}</a>;
    },
  },
};

export const revalidate = 60;

// FIXED: params must be typed as a Promise in Next.js 15+
export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  
  // FIXED: Await the params before trying to read the slug
  const resolvedParams = await params;

  // Fetch specific post by slug
  const query = `
    *[_type == "post" && slug.current == $slug][0] {
      title,
      author,
      readTime,
      categories,
      publishedAt,
      "imageUrl": mainImage.asset->url,
      body
    }
  `;
  
  // Pass the resolved slug into the query
  const post = await client.fetch(query, { slug: resolvedParams.slug });

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <h1 className="text-3xl font-bold text-gray-800">Post not found.</h1>
      </div>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white pt-32 pb-24">
        
        {/* Back Button */}
        <div className="mx-auto max-w-3xl px-6 mb-10">
          <Link href="/insights" className="inline-flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-[#6495ED] transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Insights
          </Link>
        </div>

        {/* Article Header */}
        <header className="mx-auto max-w-3xl px-6 mb-12">
          <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-[#6495ED] mb-6">
            <span>{post.categories?.[0] || "Insight"}</span>
            <span className="text-gray-300">•</span>
            <span className="text-gray-500">{post.readTime || "5 min read"}</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#0A0A0A] leading-[1.1] mb-8">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 border-t border-gray-100 pt-6">
            <div>
              <p className="text-sm font-bold text-[#0A0A0A]">{post.author || "GoDigital Team"}</p>
              <p className="text-xs font-medium text-gray-500 mt-1">
                {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
            </div>
          </div>
        </header>

{/* Main Hero Image */}
        {post.imageUrl && (
          <div className="mx-auto max-w-5xl px-6 mb-16">
            {/* Removed the fixed aspect ratio! The container will now perfectly hug the image. */}
            <div className="relative w-full rounded-3xl overflow-hidden shadow-xl border border-gray-100 flex justify-center bg-white">
              <Image 
                src={post.imageUrl} 
                alt={post.title} 
                // The Next.js trick for images with unknown/varying aspect ratios:
                width={0}
                height={0}
                sizes="100vw"
                priority
                className="w-full h-auto"
              />
            </div>
          </div>
        )}

        {/* Article Body Content */}
        <article className="mx-auto max-w-3xl px-6">
          <div className="prose prose-lg prose-headings:font-serif prose-a:text-[#6495ED] hover:prose-a:text-blue-700 max-w-none">
            {post.body ? (
              <PortableText value={post.body} components={ptComponents} />
            ) : (
              <p className="text-gray-500 italic">No content available for this post.</p>
            )}
          </div>
        </article>

      </main>
      <Footer />
    </>
  );
}
