import { fetchAPI } from "@/lib/api";
import { Author, ArticlesResponse } from "@/types/article";

export async function getAuthorBySlug(slug: string): Promise<Author | null> {
  try {
    const res = await fetchAPI<{ docs: Author[] }>(
      `/authors?where[slug][equals]=${encodeURIComponent(slug)}`
    );
    return res.docs?.[0] || null;
  } catch (error) {
    console.error("Error fetching author by slug:", error);
    return null;
  }
}

export async function getArticlesByAuthor(authorId: string): Promise<ArticlesResponse> {
  try {
    return await fetchAPI<ArticlesResponse>(
      `/articles?where[author][equals]=${encodeURIComponent(authorId)}&depth=2`
    );
  } catch (error) {
    console.error("Error fetching articles by author:", error);
    return { docs: [] };
  }
}
