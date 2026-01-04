// app/blog/[slug]/page.tsx
import Navigation from "@/components/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface Post {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  image?: string;
  category: string;
  content: string;
}

// Fetch all posts from API
async function getAllPosts(): Promise<Post[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}

// Get a post by slug and related posts
async function getPostAndRelated(slug: string) {
  const posts = await getAllPosts();
  const post = posts.find((p) => p.slug === slug) || null;

  // Related posts: same category first, fallback to other posts
  let relatedPosts: Post[] = [];
  if (post) {
    relatedPosts = posts
      .filter((p) => p.slug !== slug && p.category === post.category)
      .slice(0, 3);

    if (relatedPosts.length === 0) {
      relatedPosts = posts.filter((p) => p.slug !== slug).slice(0, 3);
    }
  }

  return { post, relatedPosts };
}

export default async function BlogPost({
  params,
}: {
  params: { slug: string } | Promise<{ slug: string }>;
}) {
  // Handle async params in Next.js 15
  const { slug } = "then" in params ? await params : params;

  const { post, relatedPosts } = await getPostAndRelated(slug);

  if (!post) {
    return (
      <>
        <Navigation />
        <main className="min-h-screen pt-16 flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-serif text-4xl font-bold mb-4">Post Not Found</h1>
            <Link href="/blog" className="text-primary hover:underline">
              Return to Blog
            </Link>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-24 pb-16">
        {/* Main Article */}
        <article className="max-w-3xl mx-auto px-4">
          {/* Back Button */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </Link>

          {/* Category */}
          <div className="text-xs uppercase tracking-wider text-muted-foreground mb-4">
            {post.category}
          </div>

          {/* Title */}
          <h1 className="font-serif text-4xl md:text-5xl font-medium mb-4">
            {post.title}
          </h1>

          {/* Meta Info */}
          <div className="flex items-center gap-3 text-sm text-muted-foreground mb-12 pb-8 border-b">
            <span>{post.author}</span>
            <span>·</span>
            <span>{post.date}</span>
            <span>·</span>
            <span>{post.readTime}</span>
          </div>

          {/* Hero Image */}
          {post.image && (
            <div className="relative w-full h-[400px] mb-12">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Article Body */}
          <div
            className="prose prose-lg prose-neutral dark:prose-invert max-w-none mb-16"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="max-w-3xl mx-auto px-4 mt-20 pt-12 border-t">
            <h2 className="font-serif text-2xl font-medium mb-8">More Stories</h2>
            <div className="space-y-8">
              {relatedPosts.map((r) => (
                <Link
                  key={r.slug}
                  href={`/blog/${r.slug}`}
                  className="group block"
                >
                  <div className="flex gap-6">
                    <div className="relative w-32 h-32 flex-shrink-0 overflow-hidden">
                      <Image
                        src={r.image || "/placeholder.svg"}
                        alt={r.title}
                        fill
                        className="object-cover group-hover:opacity-80 transition-opacity"
                      />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="text-xs uppercase tracking-wider text-muted-foreground">
                        {r.category}
                      </div>
                      <h3 className="font-serif text-xl font-medium group-hover:text-muted-foreground transition-colors">
                        {r.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {r.excerpt}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
    </>
  );
}