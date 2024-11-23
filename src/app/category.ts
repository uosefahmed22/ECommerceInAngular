export interface Category {
    id: number;
    name: string;
    description: string;
    imageUrl: string;
    products: {
        id: number;
        name: string;
        description: string;
        price: number;
        imageCoverUrl: string;
        averageRating: number;
        ratingCount: number;
    }[];
}