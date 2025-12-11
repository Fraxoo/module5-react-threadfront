import type { UserType } from "./UserType";
import type { CommentType } from "./CommentType";

export type PostType = {
  id?: number,
  username: string,
  content: string,
  createdAt: string,
  user?: UserType;
  Comments?: CommentType[];
}
