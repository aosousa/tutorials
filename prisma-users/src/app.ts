import Fastify, { FastifyReply, FastifyRequest } from "fastify";
import fastifyJwt from "@fastify/jwt";
// import swagger from 'fastify-swagger'
// import { withRefResolver } from "fastify-zod";
// import { version } from '../package.json'

// Schemas
import { userSchemas } from './modules/user/user.schema'
import { productSchemas } from "./modules/product/product.schema";

// Routes
import productRoutes from "./modules/product/product.route";
import userRoutes from "./modules/user/user.route";

export const server = Fastify()

declare module "fastify" {
    export interface FastifyInstance {
        authenticate: any;
    }
}

server.register(fastifyJwt, {
    secret: '12849ubca890snda8nsfasdfg'
})

server.decorate('authenticate', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        await request.jwtVerify()
    } catch (e) {
        return reply.send(e)
    }
})

server.get('/healthcheck', async () => {
    return {
        status: 'OK'
    }
})

async function main() {
    // register schemas
    // has to be done before registering routes, not the other way around
    for (const schema of [...userSchemas, ...productSchemas]) {
        server.addSchema(schema);
    }

    // server.register(swagger, withRefResolver({
    //     routePrefix: '/docs',
    //     exposeRoute: true,
    //     staticCSP: true,
    //     openapi: {
    //         info: {
    //             title: 'Fastify API',
    //             description: 'API for some products',
    //             version
    //         }
    //     }
    // }))

    server.register(userRoutes, {
        prefix: 'api/users'
    })

    server.register(productRoutes, {
        prefix: 'api/products'
    })

    try {
        await server.listen({
            port: 3000,
            host: '0.0.0.0'
        })
        console.log('Server ready at http://localhost:3000')
    } catch (e) {
        console.log(e)
        process.exit(1)
    }
}

main()