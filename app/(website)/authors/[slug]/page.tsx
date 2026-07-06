import { notFound } from "next/navigation";
import { Globe, User, Newspaper } from "lucide-react";
import { getAuthorBySlug, getArticlesByAuthor } from "@/services/author.service";
import ArticleCard from "@/components/article/ArticleCard";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function AuthorProfilePage({ params }: Props) {
  const { slug } = await params;

  const author = await getAuthorBySlug(slug);
  if (!author) {
    notFound();
  }

  const articlesRes = await getArticlesByAuthor(author.id);
  const authorArticles = articlesRes.docs || [];

  const serverUrl = process.env.NEXT_PUBLIC_SERVER || "https://multiventor-backend.onrender.com";
  const avatar = author.avatar?.url
    ? author.avatar.url.startsWith("http")
      ? author.avatar.url
      : `${serverUrl}${author.avatar.url}`
    : `https://ui-avatars.com/api/?name=${encodeURIComponent(
        author.displayName
      )}&background=8b5cf6&color=fff&size=180`;

  return (
    <main className="min-h-screen bg-white py-12 md:py-20 relative overflow-hidden">
      {/* Background glow blobs */}
      <div className="absolute top-10 left-10 -z-10 h-72 w-72 rounded-full bg-violet-600/[0.02] blur-[120px]" />
      <div className="absolute top-40 right-10 -z-10 h-72 w-72 rounded-full bg-indigo-600/[0.02] blur-[120px]" />

      <div className="mx-auto max-w-7xl px-6">
        
        {/* Author details banner profile */}
        <div className="glass-card mb-16 rounded-3xl p-8 md:p-12">
          <div className="flex flex-col gap-8 md:flex-row md:items-start">
            
            {/* Big Avatar */}
            <div className="relative h-32 w-32 shrink-0 md:h-40 md:w-40 mx-auto md:mx-0">
              <img
                src={avatar}
                alt={author.displayName}
                className="h-full w-full rounded-full border-4 border-zinc-200 object-cover shadow-sm"
              />
            </div>

            {/* Content text */}
            <div className="flex-1 text-center md:text-left space-y-4">
              <div>
                <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-zinc-500">
                  <User size={12} />
                  <span>Creator Profile</span>
                </span>
                <h1 className="mt-1 font-display text-4xl font-extrabold tracking-tight text-zinc-900 md:text-5xl">
                  {author.displayName}
                </h1>
              </div>

              {/* Bio description */}
              <div className="text-sm md:text-base text-zinc-700 leading-relaxed max-w-3xl">
                {author.bio?.root?.children?.map((paragraph: any, index: number) => (
                  <p key={index} className="mb-2">
                    {paragraph.children?.map((child: any, childIndex: number) => (
                      <span key={childIndex}>{child.text}</span>
                    ))}
                  </p>
                )) || <p className="text-zinc-400 italic">No biography listed.</p>}
              </div>

              {/* Social items links */}
              {author.socialLinks && author.socialLinks.length > 0 && (
                <div className="flex flex-wrap justify-center md:justify-start gap-3 pt-2">
                  {author.socialLinks.map((link: any, index: number) => (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl bg-zinc-50 border border-zinc-200 px-4 py-2 text-sm text-zinc-600 hover:bg-zinc-100 hover:text-black transition"
                    >
                      <Globe size={14} className="text-zinc-500" />
                      <span className="capitalize font-medium">{link.platform}</span>
                    </a>
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>

        {/* List of articles */}
        <section>
          <div className="mb-10 flex items-center gap-2">
            <Newspaper className="text-zinc-700" size={24} />
            <h2 className="font-display text-2xl font-bold text-zinc-900">
              Articles by {author.displayName} ({authorArticles.length})
            </h2>
          </div>

          {authorArticles.length === 0 ? (
            <div className="rounded-2xl border border-zinc-250 bg-zinc-50 p-16 text-center text-zinc-400">
              No articles published by this author yet.
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {authorArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          )}
        </section>

      </div>
    </main>
  );
}
export const dynamic = "force-dynamic";
