interface specsTypes {
  weight: number;
  dimensions: number[];
  size?: string;
  colour?: string;
  brand: string;
}

export type Product = {
  _id: string;
  title: string;
  price: number;
  images: string[];
  description: string;
  stock: number;
  quantity?: number;
  itemTotal?: number;
  categories?: string[];
  tags?: string[];
  specs?: specsTypes;
};
