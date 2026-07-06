import { fetchAPI } from "@/lib/api";
import { Article, ArticlesResponse } from "@/types/article";

export async function getArticles(): Promise<ArticlesResponse> {
  return fetchAPI<ArticlesResponse>("/articles?depth=2");
}

export async function getArticleBySlug(
  slug: string,
): Promise<Article | null> {
  const result = await fetchAPI<ArticlesResponse>(
    `/articles?where[slug][equals]=${encodeURIComponent(slug)}&depth=2`,
  );

  if (!result.docs || result.docs.length === 0) {
    return null;
  }

  return result.docs[0];
}