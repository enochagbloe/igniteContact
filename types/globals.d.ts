interface Tags {
    _id: number;
    name: string;
}

interface Author {
    _id: number;
    name: string;
    image: string;
    value: string;
}

interface Question {
    _id: number;
    title: string;
    tags: Tags[];
    author: Author;
    createdAt: Date;
    upvotes: number;
    views: number;
    answers: number;
}