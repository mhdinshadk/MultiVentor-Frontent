import { fetchAPI } from "@/lib/api";
import { Category, ArticlesResponse } from "@/types/article";

export interface CategoriesResponse {
  docs: Category[];
}

export async function getCategories(): Promise<CategoriesResponse> {
  try {
    return await fetchAPI<CategoriesResponse>("/categories?limit=100");
  } catch (error) {
    console.error("Error fetching categories:", error);
    return { docs: [] };
  }
}


export async function getArticlesByCategory(
  categorySlug: string
): Promise<ArticlesResponse> {
  try {
    // 1. Fetch all categories to build the hierarchy
    const catsRes = await getCategories();
    const categories = catsRes.docs || [];

    // 2. Find target category
    const target = categories.find((c) => c.slug === categorySlug);
    if (!target) {
      return { docs: [] };
    }

    // 3. Find all descendant slugs recursively
    const getDescendants = (parentId: string): string[] => {
      const children = categories.filter((c) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const pId = typeof c.parent === "object" && c.parent !== null ? (c.parent as any).id : c.parent;
        return pId === parentId;
      });

      let slugs = children.map((c) => c.slug);
      for (const child of children) {
        slugs = [...slugs, ...getDescendants(child.id)];
      }
      return slugs;
    };

    const allSlugs = [categorySlug, ...getDescendants(target.id)];

    // 4. Query articles matching any category slug in the list
    const queryParams = allSlugs
      .map((slug, idx) => `where[categories.slug][in][${idx}]=${encodeURIComponent(slug)}`)
      .join("&");

    return await fetchAPI<ArticlesResponse>(
      `/articles?${queryParams}&depth=2`
    );
  } catch (error) {
    console.error("Error fetching articles by category:", error);
    return { docs: [] };
  }
}
