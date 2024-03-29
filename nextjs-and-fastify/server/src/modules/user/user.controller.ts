import { FastifyReply } from "fastify/types/reply";
import { FastifyRequest } from "fastify/types/request";
import { createUser, findUserByEmailAndPassword, generateSalt } from "./user.service";
import { createVault, findVaultByUser } from "../vault/vault.service";
import { COOKIE_DOMAIN } from "../../constants";
import logger from "../../utils/logger";

export async function registerUserHandler(request: FastifyRequest<{
    Body: Parameters<typeof createUser>[number]
}>, reply: FastifyReply) {
    const body = request.body

    try {
        const user = await createUser(body)
        const salt = generateSalt()
        const vault = await createVault({
            user: user._id.toString(),
            salt
        })
        const accessToken = await reply.jwtSign({
            _id: user._id.toString(),
            email: user.email
        })

        reply.setCookie('token', accessToken, {
            domain: COOKIE_DOMAIN,
            path: '/',
            secure: false,
            httpOnly: true,
            sameSite: false
        })

        return reply.code(201).send({ accessToken, vault: vault.data, salt })
    } catch (e) {
        logger.error(e, 'Error creating user')
        return reply.code(500).send(e)
    }
}

export async function loginHandler(request: FastifyRequest<{
    Body: Parameters<typeof createUser>[number]
}>, reply: FastifyReply) {
    const user = await findUserByEmailAndPassword(request.body)
    if (!user) {
        return reply.code(401).send({
            message: 'Invalid email or password'
        })
    }

    const vault = await findVaultByUser(user._id.toString())

    const accessToken = await reply.jwtSign({
        _id: user._id.toString(),
        email: user.email
    })

    reply.setCookie('token', accessToken, {
        domain: COOKIE_DOMAIN,
        path: '/',
        secure: false,
        httpOnly: true,
        sameSite: false
    })

    return reply.code(200).send({ accessToken, vault: vault?.data, salt: vault?.salt })

}