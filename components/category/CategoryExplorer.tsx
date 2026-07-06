"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Search, Tag, ArrowRight, BookOpen, Laptop, Palette, Heart, Compass, 
  TrendingUp, GraduationCap, Activity, Layers, Calendar, Clock
} from "lucide-react";
import { Category, Article } from "@/types/article";

type Props = {
  categories: Category[];
  articles: Article[];
};

export default function CategoryExplorer({ categories, articles }: Props) {
  const [searchQuery, setSearchQuery] = useState("");

  // Helper to map category to relevant icon
  const getCategoryIcon = (slug: string, name: string) => {
    const s = `${slug.toLowerCase()} ${name.toLowerCase()}`;
    if (s.includes("tech") || s.includes("soft") || s.includes("code") || s.includes("prog") || s.includes("dev")) return Laptop;
    if (s.includes("design") || s.includes("art") || s.includes("creative") || s.includes("ui") || s.includes("ux")) return Palette;
    if (s.includes("business") || s.includes("finance") || s.includes("market") || s.includes("money") || s.includes("startup")) return TrendingUp;
    if (s.includes("travel") || s.includes("adventure") || s.includes("explore") || s.includes("trip")) return Compass;
    if (s.includes("life") || s.includes("health") || s.includes("fit") || s.includes("wellness") || s.includes("food")) return Heart;
    if (s.includes("learn") || s.includes("edu") || s.includes("acad") || s.includes("study") || s.includes("tutorial")) return GraduationCap;
    if (s.includes("medical") || s.includes("science") || s.includes("bio")) return Activity;
    return Tag;
  };

  // Helper to resolve articles for a category recursively including descendant categories
  const getCategoryArticles = (catId: string, catSlug: string): Article[] => {
    const getDescendantSlugs = (parentId: string): string[] => {
      const children = categories.filter((c) => {
        const pId = typeof c.parent === "object" && c.parent !== null ? (c.parent as any).id : c.parent;
        return pId === parentId;
      });
      let slugs = children.map((c) => c.slug);
      for (const child of children) {
        slugs = [...slugs, ...getDescendantSlugs(child.id)];
      }
      return slugs;
    };
    const allSlugs = [catSlug, ...getDescendantSlugs(catId)];
    return articles.filter((art) => art.categories?.some((c) => allSlugs.includes(c.slug)));
  };

  // Calculate statistics
  const totalCategories = categories.length;
  const totalArticles = articles.length;
  
  // Filtered categories based on search input
  const filteredCategories = categories.filter((cat) => {
    const query = searchQuery.toLowerCase();
    return (
      cat.name.toLowerCase().includes(query) ||
      cat.slug.toLowerCase().includes(query) ||
      (cat.description && cat.description.toLowerCase().includes(query))
    );
  });

  return (
    <div className="space-y-12">
      {/* Stats Summary Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <div className="rounded-2xl border border-zinc-200/60 bg-white p-6 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.01)] transition hover:shadow-md">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold-light text-gold">
              <Layers size={22} />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Total Topics</p>
              <h3 className="font-display text-2xl font-black text-zinc-900">{totalCategories}</h3>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-zinc-200/60 bg-white p-6 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.01)] transition hover:shadow-md">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-100 text-zinc-900">
              <BookOpen size={22} />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Total Articles</p>
              <h3 className="font-display text-2xl font-black text-zinc-900">{totalArticles}</h3>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-zinc-200/60 bg-white p-6 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.01)] transition hover:shadow-md">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold/10 text-gold">
              <TrendingUp size={22} />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Avg. Articles / Topic</p>
              <h3 className="font-display text-2xl font-black text-zinc-900">
                {totalCategories > 0 ? (totalArticles / totalCategories).toFixed(1) : 0}
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Search Input Box */}
      <div className="relative mx-auto max-w-xl">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-zinc-400">
          <Search size={18} />
        </div>
        <input
          type="text"
          placeholder="Search topics by title, description, or keyword..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-2xl border border-zinc-200 bg-white py-4 pl-12 pr-4 text-sm text-zinc-900 shadow-sm transition placeholder:text-zinc-400 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute inset-y-0 right-4 flex items-center text-xs font-bold text-zinc-450 hover:text-black transition"
          >
            Clear
          </button>
        )}
      </div>

      {/* Grid List */}
      {filteredCategories.length === 0 ? (
        <div className="rounded-2xl border border-zinc-205 bg-zinc-50 p-16 text-center text-zinc-400">
          No topics matched your search criteria. Try a different term!
        </div>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCategories.map((cat) => {
            const catArticles = getCategoryArticles(cat.id, cat.slug);
            const IconComponent = getCategoryIcon(cat.slug, cat.name);

            return (
              <div
                key={cat.id}
                className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-zinc-200/80 bg-white p-8 transition-all duration-300 hover:-translate-y-1.5 hover:border-gold/50 hover:shadow-2xl hover:shadow-zinc-200/40"
              >
                {/* Visual top accent bar */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-zinc-200 via-gold/45 to-zinc-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="space-y-6">
                  {/* Category Card Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold-light text-gold transition-transform duration-300 group-hover:scale-110">
                      <IconComponent size={22} />
                    </div>
                    <span className="rounded-lg bg-zinc-50 px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase text-zinc-550 border border-zinc-150">
                      #{cat.slug}
                    </span>
                  </div>

                  {/* Category Title & Description */}
                  <div>
                    <h3 className="font-display text-2xl font-black text-zinc-900 group-hover:text-gold transition-colors duration-300">
                      <Link href={`/categories/${cat.slug}`}>{cat.name}</Link>
                    </h3>
                    <p className="mt-2.5 text-sm text-zinc-500 line-clamp-2 leading-relaxed">
                      {cat.description || "Browse articles and technical guides published under this curated category."}
                    </p>
                  </div>

                  {/* Previews of Latest Articles */}
                  <div className="pt-5 border-t border-zinc-100 space-y-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block">
                      Latest Articles
                    </span>
                    {catArticles.length === 0 ? (
                      <p className="text-xs italic text-zinc-400">No articles published yet.</p>
                    ) : (
                      <ul className="space-y-3">
                        {catArticles.slice(0, 2).map((art) => (
                          <li key={art.id} className="group/item space-y-1">
                            <Link
                              href={`/articles/${art.slug}`}
                              className="text-xs font-semibold text-zinc-850 hover:text-gold hover:underline line-clamp-1 block transition-colors duration-200"
                            >
                              {art.title}
                            </Link>
                            <div className="flex items-center gap-2 text-[10px] text-zinc-400">
                              <span className="flex items-center gap-1">
                                <Calendar size={10} />
                                <span>
                                  {art.publishedAt
                                    ? new Date(art.publishedAt).toLocaleDateString("en-US", {
                                        month: "short",
                                        day: "numeric",
                                      })
                                    : "Draft"}
                                </span>
                              </span>
                              <span>•</span>
                              <span className="flex items-center gap-1">
                                <Clock size={10} />
                                <span>{art.readTime || 3} min</span>
                              </span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>

                {/* Card Footer */}
                <div className="mt-8 flex items-center justify-between border-t border-zinc-100 pt-5">
                  <span className="text-xs font-bold text-zinc-500 bg-zinc-55 border border-zinc-100 px-3 py-1 rounded-full">
                    {catArticles.length} {catArticles.length === 1 ? "Article" : "Articles"}
                  </span>
                  
                  <Link
                    href={`/categories/${cat.slug}`}
                    className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-zinc-900 hover:text-gold transition-colors duration-200"
                  >
                    <span>View Archive</span>
                    <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
