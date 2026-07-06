export interface Comment {
  id: string;
  article: string | { id: string; title: string };
  authorName: string;
  authorEmail: string;
  content: string;
  approved: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CommentsResponse {
  docs: Comment[];
}

export interface CreateCommentDTO {
  article: string;
  authorName: string;
  authorEmail: string;
  content: string;
}
