import axios from "axios";
import ProductSchema, { IProductSchema } from "../../entity/Product";
import { upload } from "../../utils/uploaded";
import { IProductService } from "./Interfaces/IProductService";

export class ProductService implements IProductService {
  CRON() {
    axios.get('https://challenges.coode.sh/food/data/json/index.txt').then(({ data }) => {
      data = data.split('\n')
      data.map((x) => {
        axios.get(`https://challenges.coode.sh/food/data/json/${x}`).then(({ data }) => {
        }).catch(err => console.log(err));
      })
    }).catch(error => console.log(error));
  }
  async get(): Promise<IProductSchema[]> {
    return await ProductSchema.find()
  }
  async find(code: String): Promise<IProductSchema> {
    return await ProductSchema.findOne({ code })
  }
  async create(data: IProductSchema[]): Promise<IProductSchema> {
    const product = await ProductSchema.create(data)
    return product as any as IProductSchema;
  }
  async update(code: String, data: IProductSchema): Promise<IProductSchema> {
    const dataUpdated = await ProductSchema.findOneAndUpdate({ code }, { ...data }, { new: true })
    return dataUpdated as any as IProductSchema;
  }
  async delete(code: String): Promise<void> {
    await ProductSchema.findOneAndUpdate({ code }, { status: 'trash' }, { new: true })
    return
  }
}