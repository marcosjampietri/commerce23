import { model, Schema, Model, models, Document } from "mongoose";

interface specsTypes {
  weight: number;
  dimensions: number[];
  size?: string;
  colour?: string;
  brand: string;
}

interface product extends Document {
  title: string;
  price: number;
  images: string[];
  description: string;
  stock: number;
  categories?: string[];
  tags?: string[];
  specs?: specsTypes;
}

const ProdSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  images: {
    type: [String],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  categories: {
    type: [String],
    required: false,
  },
  tags: {
    type: [String],
    required: false,
  },
  specs: {
    type: Object,
    required: false,
  },
});

const products: Model<product> =
  models.products || model("products", ProdSchema);

export default products;
