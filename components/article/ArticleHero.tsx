import { Article } from "@/types/article";

type Props = {
  article: Article;
};

export default function ArticleHero({ article }: Props) {
  const serverUrl = process.env.NEXT_PUBLIC_SERVER || "http://localhost:3001";
  const imageUrl = article.featuredImage?.url
    ? `${serverUrl}${article.featuredImage.url}`
    : "https://images.unsplash.com/photo-1542435503-956c469947f6?auto=format&fit=crop&w=1600&q=80";

  return (
    <section className="relative mb-12">
      {/* Featured Banner Image */}
      <div className="relative h-[320px] md:h-[480px] w-full overflow-hidden rounded-3xl border border-zinc-800/80 shadow-2xl">
        <img
          src={imageUrl}
          alt={article.title}
          className="h-full w-full object-cover transition-transform duration-700 hover:scale-102"
        />
        {/* Modern dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-[#030303]/30 to-transparent" />
      </div>

      {/* Post Title */}
      <div className="mt-8 max-w-4xl">
        <h1 className="font-serif text-4xl font-extrabold tracking-tight text-zinc-950 sm:text-5xl md:text-6xl leading-tight">
          {article.title}
        </h1>
      </div>
    </section>
  );
}