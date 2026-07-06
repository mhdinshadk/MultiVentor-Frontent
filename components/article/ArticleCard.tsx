import Link from "next/link";
import { Clock, Calendar, ArrowUpRight } from "lucide-react";
import { Article } from "@/types/article";

type Props = {
  article: Article;
};

export default function ArticleCard({ article }: Props) {
  const imageUrl = article.featuredImage?.url
    ? article.featuredImage.url.startsWith("http")
      ? article.featuredImage.url
      : `${process.env.NEXT_PUBLIC_SERVER || ""}${article.featuredImage.url}`
    : "https://images.unsplash.com/photo-1542435503-956c469947f6?auto=format&fit=crop&w=800&q=80";

  const authorAvatar = article.author?.avatar?.url
    ? article.author.avatar.url.startsWith("http")
      ? article.author.avatar.url
      : `${process.env.NEXT_PUBLIC_SERVER || ""}${article.author.avatar.url}`
    : `https://ui-avatars.com/api/?name=${encodeURIComponent(article.author?.displayName || "Author")}&background=8b5cf6&color=fff`;

  return (
    <article className="glass-card glow-hover group flex flex-col overflow-hidden rounded-2xl transition-all duration-300">
      
      {/* Thumbnail Container */}
      <div className="relative aspect-video w-full overflow-hidden bg-zinc-100">
        <img
          src={imageUrl}
          alt={article.title || "Article Image"}
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-60 transition-opacity group-hover:opacity-80" />
        
        {/* Dynamic Category Badges in corner */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          {article.categories?.slice(0, 2).map((category) => (
            <Link
              key={category.id}
              href={`/articles?category=${category.slug}`}
              className="rounded-lg bg-gold-light/95 backdrop-blur-md px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase text-gold border border-gold/20 hover:bg-black hover:text-white hover:border-black transition-colors"
            >
              {category.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Info Container */}
      <div className="flex flex-1 flex-col p-6">
        
        {/* Title */}
        <h3 className="mb-3 font-display text-xl font-bold text-zinc-900 leading-snug group-hover:text-black transition-colors line-clamp-2">
          <Link href={`/articles/${article.slug}`} className="focus:outline-none">
            {article.title}
          </Link>
        </h3>

        {/* Meta Row: Date & Read Time */}
        <div className="mb-6 flex items-center gap-4 text-xs text-zinc-400">
          <span className="flex items-center gap-1">
            <Calendar size={12} />
            <span>
              {article.publishedAt 
                ? new Date(article.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
                : "Draft"}
            </span>
          </span>
          <span className="flex items-center gap-1">
            <Clock size={12} />
            <span>{article.readTime || 3} min read</span>
          </span>
        </div>

        {/* Author Bio Row */}
        <div className="mt-auto flex items-center justify-between border-t border-zinc-200/60 pt-4">
          <Link
            href={`/authors/${article.author?.slug}`}
            className="flex items-center gap-2.5 hover:text-black transition-colors"
          >
            <img
              src={authorAvatar}
              alt={article.author?.displayName}
              className="h-7 w-7 rounded-full object-cover border border-gold/30"
            />
            <span className="text-sm font-medium text-zinc-500 group-hover:text-zinc-900 transition-colors">
              {article.author?.displayName}
            </span>
          </Link>

          <Link
            href={`/articles/${article.slug}`}
            className="flex items-center gap-1 text-xs font-bold text-gold hover:text-zinc-900 transition"
          >
            <span>Read</span>
            <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

      </div>
    </article>
  );
}