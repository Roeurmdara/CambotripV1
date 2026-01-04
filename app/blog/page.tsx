"use client";
import { useEffect, useState } from "react";
import Navigation from "@/components/navigation";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, User } from "lucide-react";
import DotWave from "@/components/DotWave";

// Define the type for a blog post
interface Post {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image?: string;
}

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`)
      .then((res) => res.json())
      .then((data: Post[]) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching posts:", err);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-16">
        {/* Hero Section */}
        <section className="relative py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-light text-5xl md:text-6xl  text-primary mb-6 text-balance">
              Travel Stories & Insights
            </h1>
            <p className="text-xl text-muted-foreground text-pretty font-light">
              Discover Cambodia through the eyes of travelers, photographers,
              and culture enthusiasts
            </p>
          </div>
        </section>

        {/* Blog Grid */}
       <section className="py-12 px-4">
  <div className="max-w-7xl mx-auto">
    {loading ? (
      <div className="flex items-center justify-center min-h-[300px] ">
        <DotWave />
      </div>
    ) : posts.length === 0 ? (
      <p className="text-center text-muted-foreground">
        No posts available.
      </p>
    ) : (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group block"
          >
            <div className="relative h-56 overflow-hidden mb-4 ">
              <Image
                src={post.image || "/placeholder.svg"}
                alt={post.title}
                fill
                className="object-cover group-hover:opacity-90 transition-opacity duration-300"
              />
            </div>
            
            <div className="space-y-2">
              <div className="text-xs uppercase tracking-wider text-muted-foreground">
                {post.category}
              </div>
              
              <h2 className="font-serif text-xl font-medium group-hover:text-muted-foreground transition-colors">
                {post.title}
              </h2>
              
              <p className="text-sm text-muted-foreground line-clamp-2">
                {post.excerpt}
              </p>
              
              <div className="flex items-center gap-3 text-xs text-muted-foreground pt-2">
                <span>{post.date}</span>
                <span>·</span>
                <span>{post.readTime}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    )}
  </div>
</section>

        {/* Newsletter Section */}
        <section className="py-20 px-4 bg-card/50">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-light text-4xl  text-primary mb-4">
              Stay Inspired
            </h2>
            <p className="text-muted-foreground font-light mb-8 text-pretty">
              Get the latest travel stories, tips, and Cambodia insights
              delivered to your inbox
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto font-light">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-background border border-border focus:outline-none focus:border-primary"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-primary text-primary-foreground rounded-lg  hover:bg-primary/90 transition-colors font-light"
              >
                Subscribe
              </button>
            </form>
          </div>
        </section>
      </main>
    </>
  );
}
