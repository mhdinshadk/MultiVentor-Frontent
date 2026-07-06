import Link from "next/link";
import { ArrowRight, Flame } from "lucide-react";
import ArticleCard from "@/components/article/ArticleCard";
import { Article } from "@/types/article";

type Props = {
  articles: Article[];
};

export default function LatestArticles({ articles }: Props) {
  // Only show first 6 articles on the homepage, sorted/filtered as needed
  const displayArticles = articles.slice(0, 6);

  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="mb-12 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-zinc-500">
            <Flame size={12} />
            <span>Trending Topics</span>
          </span>
          <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl">
            Latest Articles
          </h2>
          <p className="mt-2 text-zinc-500">
            Explore the latest stories and guides from our authors.
          </p>
        </div>

        <Link
          href="/articles"
          className="group flex items-center gap-1.5 self-start text-sm font-semibold text-black hover:text-zinc-650 transition"
        >
          <span>View all articles</span>
          <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      {displayArticles.length === 0 ? (
        <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-12 text-center text-zinc-400">
          No articles found. Start publishing from the CMS dashboard!
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {displayArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      )}
    </section>
  );
}