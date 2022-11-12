import { IProductSchema } from "../../../entity/Product"

export interface IProductService {
  get(): Promise<IProductSchema[]>
  find(code: String): Promise<IProductSchema>
  create(data: IProductSchema[]): Promise<IProductSchema>
  update(code: String, data: IProductSchema): Promise<IProductSchema>
  delete(code: String): Promise<void>
  CRON()
}