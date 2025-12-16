

export type Post = {
    id: number;
    content: string;
    createdAt: string;
    commentCount: number;
    user: {
        id: number;
        username: string;
        name: string;
        lastname: string;
    };
}