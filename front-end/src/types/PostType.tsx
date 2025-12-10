
export type PostProps = {
  id?: number,
  username: string,
  content: string,
  date: string,
  user_id?: number
  User?: {
    username: string;
  } | null;
}
