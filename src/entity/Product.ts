import { Schema, Document, model } from "mongoose";

export interface IProductSchema extends Document {
  code: Number,
  status: String,
  url: String,
  creator: String,
  product_name: String,
  quantity: String,
  brands: String,
  categories: String,
  labels: String,
  cities: String,
  purchase_places: String,
  stores: String,
  ingredients_text: String,
  traces: String,
  serving_size: String,
  serving_quantity: Number,
  nutriscore_score: Number,
  nutriscore_grade: String,
  main_category: String,
  image_url: String,
}

const ProductSchema = new Schema({
  code: Number,
  status: {
    type: String,
    enum: ['draft', 'trash', 'published'],
    default: 'draft',
  },
  imported_t: {
    type: Date,
    default: new Date(),
  },
  url: String,
  creator: String,
  created_t: {
    type: Date,
    default: Date.now()
  },
  last_modified_t: {
    type: Date,
    default: Date.now(),
  },
  product_name: String,
  quantity: String,
  brands: String,
  categories: String,
  labels: String,
  cities: String,
  purchase_places: String,
  stores: String,
  ingredients_text: String,
  traces: String,
  serving_size: String,
  serving_quantity: Number,
  nutriscore_score: Number,
  nutriscore_grade: String,
  main_category: String,
  image_url: String,
});



export default model('products', ProductSchema);