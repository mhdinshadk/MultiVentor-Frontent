import { CommentsResponse, Comment, CreateCommentDTO } from "@/types/comment";

/**
 * Fetch approved comments for an article via the local Next.js API proxy.
 * Using a relative /api route so it works in both server and client contexts
 * without exposing the backend URL.
 */
export async function getCommentsForArticle(
  articleId: string
): Promise<Comment[]> {
  try {
    const res = await fetch(
      `/api/comments?articleId=${encodeURIComponent(articleId)}`,
      { cache: "no-store" }
    );
    if (!res.ok) {
      console.error("Failed to fetch comments:", res.status, res.statusText);
      return [];
    }
    const result: CommentsResponse = await res.json();
    return result.docs || [];
  } catch (error) {
    console.error("Error fetching comments:", error);
    return [];
  }
}

export async function createComment(
  data: CreateCommentDTO
): Promise<Comment | null> {
  try {
    const res = await fetch("/api/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      console.error("Failed to post comment:", res.status, res.statusText);
      return null;
    }
    return res.json();
  } catch (error) {
    console.error("Error creating comment:", error);
    return null;
  }
}
