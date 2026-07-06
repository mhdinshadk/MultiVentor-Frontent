import Link from "next/link";
import { User, Globe, ExternalLink } from "lucide-react";
import { Author } from "@/types/article";

type Props = {
  author: Author;
};

export default function AuthorCard({ author }: Props) {
  const serverUrl = process.env.NEXT_PUBLIC_SERVER || "https://multiventor-backend.onrender.com";
  const avatar = author.avatar?.url
    ? `${serverUrl}${author.avatar.url}`
    : `https://ui-avatars.com/api/?name=${encodeURIComponent(author.displayName)}&background=8b5cf6&color=fff`;

  return (
    <section className="glass-card mt-16 rounded-3xl p-8 relative overflow-hidden">
      {/* Accent Glow backdrop */}
      <div className="absolute top-0 right-0 -z-10 h-32 w-32 rounded-full bg-zinc-100/50 blur-3xl" />

      <div className="flex flex-col gap-6 md:flex-row md:items-center">
        {/* Avatar */}
        <div className="relative h-24 w-24 shrink-0">
          <img
            src={avatar}
            alt={author.displayName}
            className="h-full w-full rounded-full border-2 border-zinc-200 object-cover shadow-sm"
          />
        </div>

        {/* Details & Info */}
        <div className="flex-1 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                Author
              </span>
              <h4 className="font-display text-2xl font-bold text-zinc-900 mt-0.5">
                {author.displayName}
              </h4>
            </div>

            <Link
              href={`/authors/${author.slug}`}
              className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-zinc-500 hover:text-black transition"
            >
              <span>View Profile</span>
              <ExternalLink size={12} />
            </Link>
          </div>

          {/* Bio text (Render Lexical) */}
          <div className="text-sm text-zinc-700 leading-relaxed max-w-3xl">
            {author.bio?.root?.children?.map((paragraph: any, index: number) => (
              <p key={index} className="mb-2">
                {paragraph.children?.map((child: any, childIndex: number) => (
                  <span key={childIndex}>{child.text}</span>
                ))}
              </p>
            )) || <p className="text-zinc-400 italic">No biography provided.</p>}
          </div>

          {/* Social connections */}
          {author.socialLinks && author.socialLinks.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {author.socialLinks.map((link: any, index: number) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-zinc-50 border border-zinc-200 px-3 py-1.5 text-xs text-zinc-600 hover:bg-zinc-100 hover:text-black transition"
                >
                  <Globe size={12} className="text-zinc-500" />
                  <span className="capitalize">{link.platform}</span>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}