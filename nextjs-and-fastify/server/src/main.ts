import { FastifyInstance } from 'fastify'
import createServer from './utils/createServer'
import logger from './utils/logger'
import { connectToDB, disconnectFromDB } from './utils/db'

const gracefulShutdown = (signal: string, app: FastifyInstance) => {
    process.on(signal, async () => {
        logger.info(`Shutting down, got signal ${signal}`)
        app.close()
        await disconnectFromDB()
        process.exit(0)
    })
}

const main = async () => {
    const app = createServer()

    try {
        const url = await app.listen({
            host: '0.0.0.0',
            port: 4000
        })

        logger.info(`Server is ready at ${url}`)

        await connectToDB()
    } catch (e) {
        logger.error(e)
        process.exit(1)
    }

    const signals = ['SIGTERM', 'SIGINT']

    for (let i = 0; i < signals.length; i++) {
        gracefulShutdown(signals[i], app)
    }
}

main()