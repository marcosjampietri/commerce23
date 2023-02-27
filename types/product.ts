interface specsTypes {
    weight: string;
    dimensions: number;
    size: string;
    colour: string;
}[];

export type Product = {
    title: string;
    _id: string;
    price: number;
    url: string;
    recommendedRetailPriceCurrency: string;
    loading: boolean;
    image: string;
    brandName: string;
    categories: string[];
    specs: specsTypes;
    quantity?: any;
    itemTotal?: number;
};