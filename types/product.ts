interface specsTypes {
  weight: string;
  dimensions: number;
  size: string;
  colour: string;
}
[];

export type Product = {
  _id: string;
  title: string;
  price: number;
  image: string;
  description: string;
  // url: string;
  // recommendedRetailPriceCurrency: string;
  // loading: boolean;
  // brandName: string;
  // categories: string[];
  // specs: specsTypes;
  // quantity?: any;
  // itemTotal?: number;
};
