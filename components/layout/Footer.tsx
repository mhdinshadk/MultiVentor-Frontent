"use client";

import Link from "next/link";
import { useState } from "react";
import { createSubscriber } from "@/services/subscriber.service";

import { BookOpen, Send } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    if (email) {
      const res = await createSubscriber({ email });
      if (res) {
        setSubscribed(true);
        setEmail("");
      } else {
        setErrorMsg("Failed to subscribe. Maybe you already signed up!");
      }
    }
  };

  return (
    <footer className="border-t border-zinc-200 bg-zinc-50 py-16 text-zinc-600">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-4 md:grid-cols-2">
          
          {/* Logo & Description */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 font-display text-xl font-black text-zinc-900">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-black text-gold shadow-[0_2px_8px_rgba(0,0,0,0.15)]">
                <BookOpen size={16} />
              </div>
              <span>Multi<span className="text-gold">Blog</span></span>
            </Link>
            <p className="text-sm text-zinc-500 leading-relaxed">
              A premium multi-vendor publishing hub hosting outstanding content from tech visionaries, design gurus, and product thinkers.
            </p>
            {/* Socials */}
            <div className="flex gap-4 pt-2">
              <a href="#" className="hover:text-gold transition-colors" aria-label="GitHub">
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a href="#" className="hover:text-gold transition-colors" aria-label="Twitter">
                <svg className="h-4 w-4 fill-current mt-0.5" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="#" className="hover:text-gold transition-colors" aria-label="LinkedIn">
                <svg className="h-4.5 w-4.5 fill-current mt-0.5" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764 0-.973.784-1.763 1.75-1.763s1.75.79 1.75 1.763c0 .974-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            </div>
          </div>


          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold tracking-wider uppercase text-zinc-900">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/" className="hover:text-gold transition">Home</Link>
              </li>
              <li>
                <Link href="/articles" className="hover:text-gold transition">Browse Articles</Link>
              </li>
              <li>
                <Link href="/categories" className="hover:text-gold transition">Categories Hub</Link>
              </li>
            </ul>
          </div>

          {/* Categories Quick Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold tracking-wider uppercase text-zinc-900">Top Categories</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/articles?category=technology" className="hover:text-gold transition">Technology</Link>
              </li>
              <li>
                <Link href="/articles?category=design" className="hover:text-gold transition">Design</Link>
              </li>
              <li>
                <Link href="/articles?category=business" className="hover:text-gold transition">Business</Link>
              </li>
            </ul>
          </div>

          {/* Newsletter subscription */}
          <div>
            <h3 className="mb-4 text-sm font-semibold tracking-wider uppercase text-zinc-900">Subscribe</h3>
            <p className="mb-4 text-sm text-zinc-500">
              Get raw insights delivered weekly to your inbox.
            </p>
            {subscribed ? (
              <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-600">
                🎉 Thanks for subscribing!
              </div>
            ) : (
              <div className="space-y-2">
                <form onSubmit={handleSubscribe} className="relative flex">
                  <input
                    type="email"
                    placeholder="name@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full rounded-xl border border-zinc-250 bg-white px-4 py-3 text-sm text-zinc-900 placeholder-zinc-400 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 top-1.5 flex h-9 w-9 items-center justify-center rounded-lg bg-black hover:bg-gold text-white transition-all shadow-sm"
                  >
                    <Send size={14} />
                  </button>
                </form>
                {errorMsg && (
                  <p className="text-xs text-rose-600 font-medium">
                    ⚠️ {errorMsg}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="mt-16 border-t border-zinc-200 pt-8 text-center text-xs text-zinc-500">
          © {new Date().getFullYear()} MultiVendor Blog. Powered by Next.js & Payload CMS. All rights reserved.
        </div>
      </div>
    </footer>
  );
}