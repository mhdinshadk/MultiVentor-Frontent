import { Tag } from "lucide-react";
import Link from "next/link";
import { getCategories } from "@/services/category.service";
import { getArticles } from "@/services/article.service";
import CategoryExplorer from "@/components/category/CategoryExplorer";

export default async function CategoriesPage() {
  const [categoriesRes, articlesRes] = await Promise.all([
    getCategories(),
    getArticles(),
  ]);

  const categories = categoriesRes.docs || [];
  const articles = articlesRes.docs || [];

  return (
    <main className="relative min-h-screen bg-white py-16 md:py-24 overflow-hidden">
      {/* Premium Ambient Background Blobs */}
      <div className="absolute top-20 left-10 -z-10 h-80 w-80 rounded-full bg-gold/5 blur-[130px] animate-float" />
      <div className="absolute bottom-40 right-10 -z-10 h-96 w-96 rounded-full bg-zinc-100 blur-[150px]" />

      <div className="mx-auto max-w-7xl px-6">
        {/* Breadcrumbs */}
        <div className="mb-6 flex justify-center">
          <nav className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-400">
            <Link href="/" className="hover:text-gold transition">
              Home
            </Link>
            <span>/</span>
            <span className="text-zinc-900">Topics</span>
          </nav>
        </div>

        {/* Section Header */}
        <div className="mb-20 text-center space-y-4">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/30 bg-gold-light px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-gold shadow-sm">
            <Tag size={10} />
            <span>Topic Directories</span>
          </span>
          
          <h1 className="font-serif text-4xl font-black tracking-tight text-zinc-950 sm:text-5xl md:text-6xl">
            Explore Curated{" "}
            <span className="font-sans font-black bg-gradient-to-r from-zinc-950 via-zinc-800 to-gold bg-clip-text text-transparent">
              Knowledge Hubs
            </span>
          </h1>
          
          <p className="mx-auto max-w-2xl text-sm md:text-base text-zinc-550 leading-relaxed font-medium">
            Dive into deep technical tutorials, thought leadership, industry updates, and architectural walkthroughs categorized for developers and designers alike.
          </p>
        </div>

        {/* Interactive Explorer component */}
        {categories.length === 0 ? (
          <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-20 text-center text-zinc-450 font-medium">
            No topics defined yet. Create them in your Payload CMS dashboard!
          </div>
        ) : (
          <CategoryExplorer categories={categories} articles={articles} />
        )}
      </div>
    </main>
  );
}

export const dynamic = "force-dynamic";
