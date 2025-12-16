

export type Post = {
    id: number;
    content: string;
    createdAt: string;
    commentCount: number;
    User: {
        id: number;
        username: string;
        name: string;
        lastname: string;
    };
}