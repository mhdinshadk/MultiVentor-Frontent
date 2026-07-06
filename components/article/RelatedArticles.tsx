import { getArticles } from "@/services/article.service";
import ArticleCard from "./ArticleCard";
import { Category } from "@/types/article";

type Props = {
  currentSlug: string;
  categories?: Category[];
};

export default async function RelatedArticles({ currentSlug, categories }: Props) {
  const allArticles = await getArticles();
  
  const categorySlugs = categories?.map((c) => c.slug) || [];

  // Exclude current article and filter by shared categories
  let related = allArticles.docs.filter((art) => {
    if (art.slug === currentSlug) return false;
    return art.categories?.some((c) => categorySlugs.includes(c.slug));
  });

  // Fallback to any other articles if none share categories
  if (related.length === 0) {
    related = allArticles.docs.filter((art) => art.slug !== currentSlug);
  }

  const displayArticles = related.slice(0, 3);

  if (displayArticles.length === 0) {
    return null;
  }

  return (
    <section className="mt-20 border-t border-zinc-200 pt-16">
      <h3 className="font-display text-2xl font-bold text-zinc-900 mb-8">
        Related Articles
      </h3>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {displayArticles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </section>
  );
}
