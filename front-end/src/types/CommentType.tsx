import type { UserType } from "./UserType"

export type CommentType = {
  id?: number,
  content: string,
  createdAt: string,
  post_id: number,
  user_id: number,
  user?: UserType
}