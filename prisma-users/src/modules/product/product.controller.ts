import { FastifyReply, FastifyRequest } from "fastify";
import { createProduct, getProducts } from "./product.service";
import { CreateProductInput } from "./product.schema";

export async function createProductHandler(request: FastifyRequest<{ Body: CreateProductInput }>, reply: FastifyReply) {
    const product = await createProduct({
        ...request.body,
        ownerId: request.body.user
    })

    return product
}

export async function getProductsHandler() {
    const products = await getProducts()

    return products
}