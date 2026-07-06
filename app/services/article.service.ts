import { fetchAPI } from "../lib/api"
import { Article, ArticlesResponse } from "@/types/article"

export async function getArticles(): Promise<ArticlesResponse> {
  return fetchAPI("/articles?depth=2");
}

export async function getArticleBySlug(slug: string) {
  return fetchAPI(
    `/articles?where[slug][equals]=${slug}&depth=2`,
  )
}