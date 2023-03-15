interface specsTypes {
  weight: number;
  dimensions: number[];
  size?: string;
  colour?: string;
  brandName: string;
}

export type Product = {
  _id: string;
  title: string;
  price: number;
  image: string;
  description: string;
  stock: number;
  quantity?: number;
  itemTotal?: number;
  url?: string;
  categories?: string[];
  tags?: string[];
  specs?: specsTypes;
};
