import { FastifyInstance, FastifyPluginOptions, FastifyError } from 'fastify'
import { updateVaultHandler } from './vault.controller'

const vaultRoutes = (app: FastifyInstance, _: FastifyPluginOptions, done: (err?: FastifyError) => void) => {
    app.put('/', {
        onRequest: [app.authenticate]
    }, updateVaultHandler)

    done()
}

export default vaultRoutes