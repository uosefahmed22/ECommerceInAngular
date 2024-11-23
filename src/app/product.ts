export interface Product {
    productId?: number;
    id: number;
    name?: string;
    description?: string;
    price?: number;
    color?: string;
    size?: string;
    stock?: number;
    imageCoverUrl: string;
    averageRating: number;
    ratingAverage: number;
    ratingCount: number;
    productImagesUrls?: string[];
    productDtoId: number;
    categoryDto: {
        id: number;
        name?: string;
    };
    brandDto: {
        id: number;
        name: string;
    };
}