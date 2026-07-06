import Hero from "@/components/home/Hero";
import LatestArticles from "@/components/home/LatestArticles";
import { getArticles } from "@/services/article.service";

export const dynamic = "force-dynamic";

export default async function HomePage() {

  const articles = await getArticles();

  console.log(articles);

  return (
    <>
      <Hero />
      <LatestArticles articles={articles.docs} />
    </>
  );
}