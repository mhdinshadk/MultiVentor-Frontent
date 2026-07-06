"use client";

import React, { useState, useEffect } from "react";
import { MessageSquare, Send, User, Clock } from "lucide-react";
import { getCommentsForArticle, createComment } from "@/services/comment.service";
import { Comment } from "@/types/comment";

type Props = {
  articleId: string;
};

export default function CommentsSection({ articleId }: Props) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  // Form State
  const [authorName, setAuthorName] = useState("");
  const [authorEmail, setAuthorEmail] = useState("");
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Fetch comments
  useEffect(() => {
    async function loadComments() {
      try {
        const data = await getCommentsForArticle(articleId);
        setComments(data);
      } catch (err) {
        console.error("Failed to load comments:", err);
      } finally {
        setLoading(false);
      }
    }
    loadComments();
  }, [articleId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitMessage(null);

    try {
      const response = await createComment({
        article: articleId,
        authorName,
        authorEmail,
        content,
      });

      if (response) {
        setSubmitMessage({
          type: "success",
          text: "🎉 Comment submitted! It will appear here once approved by an administrator.",
        });
        setAuthorName("");
        setAuthorEmail("");
        setContent("");
      } else {
        setSubmitMessage({
          type: "error",
          text: "Something went wrong. Please check fields and try again.",
        });
      }
    } catch (err) {
      setSubmitMessage({
        type: "error",
        text: "Failed to post comment. Make sure the backend server is running.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="mt-16 border-t border-zinc-900 pt-16">
      <div className="flex items-center gap-2 mb-8">
        <MessageSquare className="text-gold" size={24} />
        <h3 className="font-display text-2xl font-bold text-zinc-900">
          Discussion ({comments.length})
        </h3>
      </div>

      <div className="grid gap-12 lg:grid-cols-5">
        
        {/* Comment list */}
        <div className="lg:col-span-3 space-y-6">
          {loading ? (
            <div className="space-y-4">
              <div className="h-20 rounded-xl bg-zinc-100 animate-pulse" />
              <div className="h-20 rounded-xl bg-zinc-100 animate-pulse" />
            </div>
          ) : comments.length === 0 ? (
            <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-8 text-center text-zinc-400">
              No approved comments yet. Be the first to start the conversation!
            </div>
          ) : (
            <div className="space-y-4">
              {comments.map((comment) => {
                const avatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  comment.authorName
                )}&background=8b5cf6&color=fff&size=80`;
                return (
                  <div
                    key={comment.id}
                    className="glass-card flex gap-4 rounded-2xl p-5 transition hover:bg-black/[0.01]"
                  >
                    <img
                      src={avatar}
                      alt={comment.authorName}
                      className="h-10 w-10 rounded-full border border-zinc-200"
                    />
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between gap-4">
                        <span className="font-semibold text-zinc-900 text-sm">
                          {comment.authorName}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-zinc-500">
                          <Clock size={11} />
                          <span>
                            {new Date(comment.createdAt).toLocaleDateString()}
                          </span>
                        </span>
                      </div>
                      <p className="text-zinc-700 text-sm leading-relaxed whitespace-pre-line">
                        {comment.content}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Comment Form */}
        <div className="lg:col-span-2">
          <div className="glass-card rounded-2xl p-6 sticky top-24">
            <h4 className="font-display text-lg font-bold text-zinc-900 mb-4">
              Leave a Comment
            </h4>

            {submitMessage && (
              <div
                className={`mb-6 rounded-xl border px-4 py-3 text-sm leading-relaxed ${
                  submitMessage.type === "success"
                    ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                    : "border-rose-200 bg-rose-50 text-rose-700"
                }`}
              >
                {submitMessage.text}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
                  Name
                </label>
                <input
                  type="text"
                  required
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-sm text-zinc-900 placeholder-zinc-400 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={authorEmail}
                  onChange={(e) => setAuthorEmail(e.target.value)}
                  placeholder="john@example.com"
                  className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-sm text-zinc-900 placeholder-zinc-400 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
                  Comment
                </label>
                <textarea
                  required
                  rows={4}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Share your thoughts..."
                  className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-sm text-zinc-900 placeholder-zinc-400 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-black hover:bg-gold disabled:bg-zinc-800 text-white py-3 text-sm font-semibold transition shadow-sm"
              >
                <Send size={14} />
                <span>{submitting ? "Submitting..." : "Post Comment"}</span>
              </button>
            </form>
          </div>
        </div>

      </div>
    </section>
  );
}
