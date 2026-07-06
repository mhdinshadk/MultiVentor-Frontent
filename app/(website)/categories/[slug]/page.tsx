import { notFound } from "next/navigation";
import { Tag, ArrowLeft, Layers, Calendar, ChevronRight } from "lucide-react";
import Link from "next/link";
import { getCategories, getArticlesByCategory } from "@/services/category.service";
import ArticleCard from "@/components/article/ArticleCard";
import { Category } from "@/types/article";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;

  // Fetch all categories to resolve hierarchy details
  const categoriesRes = await getCategories();
  const categories = categoriesRes.docs || [];
  const currentCategory = categories.find((c) => c.slug === slug);

  if (!currentCategory) {
    notFound();
  }

  // Fetch articles belonging to this category (including descendants)
  const articlesRes = await getArticlesByCategory(slug);
  const articles = articlesRes.docs || [];

  // Resolve parent category if any
  const parentCategory = typeof currentCategory.parent === "object" && currentCategory.parent !== null
    ? (currentCategory.parent as Category)
    : typeof currentCategory.parent === "string"
      ? categories.find((c) => c.id === currentCategory.parent)
      : null;

  // Resolve child categories if any
  const childCategories = categories.filter((c) => {
    const parentId = typeof c.parent === "object" && c.parent !== null ? (c.parent as any).id : c.parent;
    return parentId === currentCategory.id;
  });

  return (
    <main className="relative min-h-screen bg-white py-16 md:py-24 overflow-hidden">
      {/* Background glow blobs */}
      <div className="absolute top-10 left-10 -z-10 h-80 w-80 rounded-full bg-gold/5 blur-[120px]" />
      <div className="absolute top-40 right-10 -z-10 h-96 w-96 rounded-full bg-zinc-50 blur-[150px]" />

      <div className="mx-auto max-w-7xl px-6">
        
        {/* Breadcrumb Navigation */}
        <div className="mb-10 flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-400">
          <Link href="/categories" className="hover:text-gold transition flex items-center gap-1">
            <ArrowLeft size={12} />
            <span>All Topics</span>
          </Link>
          <ChevronRight size={12} />
          {parentCategory && (
            <>
              <Link href={`/categories/${parentCategory.slug}`} className="hover:text-gold transition">
                {parentCategory.name}
              </Link>
              <ChevronRight size={12} />
            </>
          )}
          <span className="text-zinc-900 font-bold">{currentCategory.name}</span>
        </div>

        {/* Hero Section */}
        <div className="mb-16 border-b border-zinc-100 pb-12">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="space-y-4 max-w-3xl">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-gold bg-gold-light/60 px-3 py-1 rounded-lg border border-gold/10">
                <Tag size={10} />
                <span>Archive</span>
              </span>
              <h1 className="font-serif text-4xl font-black tracking-tight text-zinc-950 sm:text-5xl md:text-6xl">
                Topic: <span className="font-sans text-gold">#{currentCategory.slug}</span>
              </h1>
              <h2 className="text-2xl font-bold font-display text-zinc-800">{currentCategory.name}</h2>
              <p className="text-sm md:text-base text-zinc-550 leading-relaxed font-medium">
                {currentCategory.description || `Explore detailed analysis, technical documentation, and opinions curated specifically under the ${currentCategory.name} namespace.`}
              </p>
            </div>

            {/* Quick Stats Panel */}
            <div className="flex flex-row md:flex-col gap-6 bg-zinc-50 border border-zinc-200/60 rounded-2xl p-6 shrink-0 md:w-64 justify-around md:justify-start">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Articles Found</p>
                <p className="text-2xl font-black font-display text-zinc-900 mt-1">{articles.length}</p>
              </div>
              <div className="h-px bg-zinc-200 hidden md:block" />
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Hierarchy</p>
                <p className="text-xs font-bold text-zinc-650 mt-1.5 uppercase">
                  {parentCategory ? `Subtopic of ${parentCategory.name}` : "Root Topic"}
                </p>
              </div>
            </div>
          </div>

          {/* Child subcategories list */}
          {childCategories.length > 0 && (
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                <Layers size={12} />
                <span>Refine Topic:</span>
              </span>
              <div className="flex flex-wrap gap-2">
                {childCategories.map((child) => (
                  <Link
                    key={child.id}
                    href={`/categories/${child.slug}`}
                    className="rounded-full bg-zinc-100 hover:bg-gold-light hover:text-gold border border-zinc-200 hover:border-gold/30 px-3.5 py-1 text-xs font-medium text-zinc-600 transition"
                  >
                    {child.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Grid of Articles */}
        {articles.length === 0 ? (
          <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-20 text-center text-zinc-400 font-medium">
            No articles found under this topic yet. Check back soon or browse other topics!
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        )}

      </div>
    </main>
  );
}

export const dynamic = "force-dynamic";
