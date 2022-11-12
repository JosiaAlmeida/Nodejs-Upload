import { Router } from "express";
import { ProductController } from "../controller/Product/ProductController";
import { ProductService } from "../Service/Products/ProductService";

const router = Router()
const controller = new ProductController(new ProductService())

router.get('/CRON', controller.CRON)
router.get('/', controller.get)
router.get('/:code', controller.find)
router.post('/', controller.create)
router.put('/:code', controller.update)
router.delete('/:code', controller.delete)

export { router }