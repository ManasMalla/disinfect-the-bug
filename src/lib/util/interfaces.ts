interface Post {
    id: string;
    title: string;
    content: string;
    authorId: string;
    image?: string;
    link?: string;
    createdAt: Date;
    updatedAt: Date;
    Author: Author;
}

interface Author {
    id: string;
    name: string;
    image?: string;
    twitter?: string;
    createdAt: Date;
    updatedAt: Date;
    Post: Post[];
}