import Link from "next/link";
import { ArrowRight, Sparkles, UserPlus } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden py-24 lg:py-32">
      {/* Decorative Blur Background Blobs */}
      <div className="absolute top-1/4 left-1/4 -z-10 h-72 w-72 rounded-full bg-zinc-100 blur-[120px]" />
      <div className="absolute top-1/3 right-1/4 -z-10 h-96 w-96 rounded-full bg-zinc-100/80 blur-[150px]" />

      <div className="mx-auto max-w-7xl px-6 text-center">
        
        {/* Floating Tag */}
        <div className="inline-flex animate-float items-center gap-2 rounded-full border border-gold/30 bg-gold-light px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-gold">
          <Sparkles size={12} className="text-gold" />
          <span>Multi-Vendor Publishing Platform</span>
        </div>

        {/* Big Bold Headline */}
        <h1 className="mt-8 font-serif text-5xl font-black leading-tight text-zinc-950 sm:text-6xl md:text-7xl">
          Discover Great Stories
          <br />
          <span className="font-sans font-black bg-gradient-to-r from-zinc-950 via-zinc-800 to-gold bg-clip-text text-transparent">
            & Technical Insights
          </span>
        </h1>

        {/* Sub-text */}
        <p className="mx-auto mt-6 max-w-2xl text-base text-zinc-550 md:text-lg leading-relaxed">
          Explore deeply technical write-ups, product designs, and creative insights curated from industry leaders and developers worldwide.
        </p>

        {/* Call to Actions */}
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            href="/articles"
            className="group flex items-center gap-2 rounded-xl bg-black px-6 py-3.5 font-semibold text-white transition-all hover:bg-gold hover:scale-105 active:scale-95 shadow-[0_4px_20px_rgba(0,0,0,0.15)]"
          >
            <span>Explore Articles</span>
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

      </div>
    </section>
  );
}