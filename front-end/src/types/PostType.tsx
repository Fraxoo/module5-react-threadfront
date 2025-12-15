import type { UserType } from "./UserType";
import type { CommentType } from "./CommentType";


export type PostType = {
  id: number;
  content: string;
  createdAt: string;
  updatedAt?: string;
  user_id: number;
  User: UserType;
  Comments: CommentType[];
  commentsCount:number;
};