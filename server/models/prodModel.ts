import { model, Schema, Model, models, Document } from "mongoose";

interface specsTypes {
  weight: number;
  dimensions: number[];
  size?: string;
  colour?: string;
  brandName: string;
}

interface product extends Document {
  title: string;
  price: number;
  image: string;
  description: string;
  stock: number;
  url?: string;
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
  image: {
    type: String,
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
  url: {
    type: String,
    required: false,
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
