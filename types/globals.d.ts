interface Tags {
    _id: string;
    name: string;
}

interface Author {
    _id: string;
    name: string;
    image: string;
    value: string;
}

interface Question {
    _id: string;
    title: string;
    tags: Tags[];
    author: Author;
    createdAt: Date;
    upvotes: number;
    views: number;
    answers: number;
}

interface PrayerRequest {
    _id: string;
    title: string;
    description: string;
    category: 'healing' | 'guidance' | 'protection' | 'provision' | 'salvation' | 'family' | 'work' | 'ministry' | 'other';
    isAnonymous: boolean;
    isPrivate: boolean;
    status: 'pending' | 'answered' | 'in_progress';
    author: Author;
    prayedBy: Author[];
    answeredAt?: Date;
    answeredDescription?: string;
    createdAt: Date;
    updatedAt: Date;
}