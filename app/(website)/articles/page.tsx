import { getArticles } from "@/services/article.service";
import { getCategories } from "@/services/category.service";
import ArticlesFilterBoard from "@/components/article/ArticlesFilterBoard";

type Props = {
  searchParams: Promise<{
    category?: string;
  }>;
};

export default async function ArticlesPage({ searchParams }: Props) {
  const params = await searchParams;
  const initialCategorySlug = params.category || "all";

  // Fetch data concurrently
  const [articlesRes, categoriesRes] = await Promise.all([
    getArticles(),
    getCategories(),
  ]);

  return (
    <main className="min-h-screen bg-white">
      <ArticlesFilterBoard
        initialArticles={articlesRes.docs || []}
        categories={categoriesRes.docs || []}
        initialCategorySlug={initialCategorySlug}
      />
    </main>
  );
}
export const dynamic = "force-dynamic";

