import express, { NextFunction, Request, Response } from "express";
import { Connect } from "./db";
import cors from 'cors'

import { router as ProductRouter } from "./router/products";

const app = express();
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())
app.use((req: Request, res: Response, next: NextFunction) => next())
// app.use(() => );
Connect()

app.use(`/product/`, ProductRouter)

app.listen(8080, () => console.log("Estou rodando"))