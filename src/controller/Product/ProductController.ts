import path from 'path';
import * as stream from 'stream';
import * as fs from 'fs';
import { promisify } from 'util';
import axios from "axios";
import { Response, Request } from "express"
import { IProductService } from "../../Service/Products/Interfaces/IProductService"

export class ProductController {
  constructor(private service: IProductService) { }
  CRON = async (req: Request, res: Response) => {
    // await axios.get('https://challenges.coode.sh/food/data/json/index.txt').then(({ data }) => {
    //   data = data.split('\n')
    //   data.map((x) => {

    //   })
    // }).catch(error => console.log(error));
    const writer = fs.createWriteStream(path.resolve(__dirname))
    const finished = promisify(stream.finished);
    axios.get(`https://challenges.coode.sh/food/data/json/products_01.json.gz`, {
      responseType: "stream"
    }).then(function (response) {
      return new Promise((resolve, reject) => {
        response.data.pipe(writer);
        let error = null;
        writer.on('error', err => {
          error = err;
          writer.close();
          reject(err);
        });
        writer.on('close', () => {
          if (!error) {
            resolve(true);
          }
          //no need to call the reject here, as it will have been called in the
          //'error' stream;
        });
      });
    });
    // const data = await this.service.CRON()
    // return res.status(200).json(data)
  }
  get = async (req: Request, res: Response) => {
    const data = await this.service.get()
    return res.status(200).json(data)
  }
  find = async (req: Request, res: Response) => {
    const data = await this.service.find(req.params.code)
    return res.status(200).json(data)
  }
  create = async (req: Request, res: Response) => {
    try {
      const data = req.body
      const result = await this.service.create(data)
      return res.status(200).json(result)
    } catch (error) {
      return res.status(400).json(error.message)
    }
  }
  update = async (req: Request, res: Response) => {
    try {
      const data = req.body
      const result = await this.service.update(req.params.code, data)
      return res.status(200).json(result)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }
  delete = async (req: Request, res: Response) => {
    try {
      const result = await this.service.delete(req.params.code)
      return res.status(204).json(result)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }
}