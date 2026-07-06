import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/services/article.service";

import ArticleHero from "@/components/article/ArticleHero";
import ArticleMeta from "@/components/article/ArticleMeta";
import RichText from "@/components/article/RichText";
import AuthorCard from "@/components/article/AuthorCard";
import RelatedArticles from "@/components/article/RelatedArticles";
import CommentsSection from "@/components/article/CommentsSection";

export const dynamic = "force-dynamic";


type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;

  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white text-zinc-900">
      <div className="mx-auto max-w-4xl px-6 py-12 md:py-20">

        {/* Hero */}
        <ArticleHero article={article} />

        {/* Author + Category + Date */}
        <ArticleMeta article={article} />

        {/* Rich Text content */}
        <div className="prose prose-zinc max-w-none mb-16">
          <RichText content={article.content} />
        </div>

        {/* Author details */}
        <AuthorCard author={article.author} />

        {/* Discussion Board */}
        <CommentsSection articleId={article.id} />

        {/* Related Articles */}
        <RelatedArticles currentSlug={article.slug} categories={article.categories} />

      </div>
    </main>
  );
}