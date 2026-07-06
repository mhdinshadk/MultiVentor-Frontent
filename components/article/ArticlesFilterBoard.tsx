"use client";

import React, { useState, useMemo } from "react";
import { Search, SlidersHorizontal, Newspaper } from "lucide-react";
import ArticleCard from "@/components/article/ArticleCard";
import { Article, Category } from "@/types/article";

type Props = {
  initialArticles: Article[];
  categories: Category[];
  initialCategorySlug?: string;
};

export default function ArticlesFilterBoard({
  initialArticles,
  categories,
  initialCategorySlug = "all",
}: Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategorySlug);
  const [sortBy, setSortBy] = useState<"latest" | "oldest" | "readTime">("latest");

  // Filtering & Sorting Logic
  const filteredArticles = useMemo(() => {
    let result = [...initialArticles];

    // Filter by category
    if (selectedCategory && selectedCategory !== "all") {
      result = result.filter((article) =>
        article.categories?.some((cat) => cat.slug === selectedCategory)
      );
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (article) =>
          article.title?.toLowerCase().includes(query) ||
          article.author?.displayName?.toLowerCase().includes(query)
      );
    }

    // Sort
    result.sort((a, b) => {
      if (sortBy === "latest") {
        return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
      }
      if (sortBy === "oldest") {
        return new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime();
      }
      if (sortBy === "readTime") {
        return (a.readTime || 0) - (b.readTime || 0);
      }
      return 0;
    });

    return result;
  }, [initialArticles, searchQuery, selectedCategory, sortBy]);

  return (
    <section className="mx-auto max-w-7xl px-6 py-12 md:py-20">
      
      {/* Header */}
      <div className="mb-12 text-center sm:text-left">
        <span className="flex items-center justify-center sm:justify-start gap-1.5 text-xs font-bold uppercase tracking-wider text-zinc-500">
          <Newspaper size={12} />
          <span>Articles Directory</span>
        </span>
        <h1 className="mt-2 font-display text-4xl font-extrabold tracking-tight text-zinc-900 sm:text-5xl">
          Browse Library
        </h1>
        <p className="mt-2 text-zinc-500">
          Search and filter through all published articles in our database.
        </p>
      </div>

      {/* Control Panel: Search & Filters */}
      <div className="glass-card mb-12 rounded-2xl p-6 space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center justify-between">
          
          {/* Search bar */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
            <input
              type="text"
              placeholder="Search by title or author..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-zinc-200 bg-white pl-11 pr-4 py-3 text-sm text-zinc-900 placeholder-zinc-400 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold transition-colors"
            />
          </div>

          {/* Sort selection */}
          <div className="flex items-center gap-2">
            <SlidersHorizontal size={16} className="text-zinc-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-700 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold transition-colors cursor-pointer"
            >
              <option value="latest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="readTime">Shortest Read</option>
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="border-t border-zinc-200 pt-5">
          <span className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">
            Filter by Category
          </span>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`rounded-lg px-4 py-2 text-xs font-semibold uppercase tracking-wider transition ${
                selectedCategory === "all"
                  ? "bg-black border border-black text-white shadow-sm hover:bg-gold hover:border-gold"
                  : "bg-white border border-zinc-200 text-zinc-600 hover:border-gold hover:text-gold"
              }`}
            >
              All Topics
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`rounded-lg px-4 py-2 text-xs font-semibold uppercase tracking-wider transition ${
                  selectedCategory === cat.slug
                    ? "bg-black border border-black text-white shadow-sm hover:bg-gold hover:border-gold"
                    : "bg-white border border-zinc-200 text-zinc-600 hover:border-gold hover:text-gold"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Grid List */}
      {filteredArticles.length === 0 ? (
        <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-16 text-center text-zinc-400">
          No articles match your selection. Try a different keyword or category filter!
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 animate-fade-in">
          {filteredArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      )}

    </section>
  );
}
