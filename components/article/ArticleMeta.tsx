import Link from "next/link";
import { User, Calendar, Clock } from "lucide-react";
import { Article } from "@/types/article";

type Props = {
  article: Article;
};

export default function ArticleMeta({ article }: Props) {
  return (
    <section className="mb-12 flex flex-col gap-6 border-b border-zinc-800/80 pb-8 sm:flex-row sm:items-center sm:justify-between">
      
      {/* Categories */}
      <div className="flex flex-wrap gap-2.5">
        {article.categories?.map((category) => (
          <Link
            key={category.id}
            href={`/articles?category=${category.slug}`}
            className="rounded-full bg-zinc-50 border border-zinc-200 px-4 py-1.5 text-xs font-semibold text-zinc-700 hover:bg-black hover:text-white hover:border-black transition-colors"
          >
            {category.name}
          </Link>
        ))}
      </div>

      {/* Meta info row */}
      <div className="flex flex-wrap items-center gap-6 text-sm text-zinc-500">
        
        {/* Author link */}
        <Link 
          href={`/authors/${article.author?.slug}`}
          className="flex items-center gap-2 hover:text-black transition-colors"
        >
          <User size={15} className="text-zinc-500" />
          <span>{article.author?.displayName}</span>
        </Link>

        {/* Date */}
        <div className="flex items-center gap-2">
          <Calendar size={15} className="text-zinc-500" />
          <span>
            {article.publishedAt
              ? new Date(article.publishedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              : "Draft"}
          </span>
        </div>

        {/* Read time */}
        <div className="flex items-center gap-2">
          <Clock size={15} className="text-zinc-500" />
          <span>{article.readTime || 3} min read</span>
        </div>

      </div>

    </section>
  );
}