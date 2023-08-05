import { z } from 'zod'
import { buildJsonSchemas } from 'fastify-zod'

// User Schemas

const userCore = {
    email: z.string({
        required_error: 'Email is a required field',
        invalid_type_error: 'Email must be a string'
    }).email(),
    name: z.string()
}

const createUserSchema = z.object({
    ...userCore,
    password: z.string({
        required_error: 'Password is a required field',
        invalid_type_error: 'Password must be a string'
    })
})

const createUserResponseSchema = z.object({
    id: z.number(),
    ...userCore
})

// Login Schemas

const loginSchema = z.object({
    email: z.string({
        required_error: 'Email is a required field',
        invalid_type_error: 'Email must be a string'
    }).email(),
    password: z.string({
        required_error: 'Password is a required field',
        invalid_type_error: 'Password must be a string'
    })
})

const loginResponseSchema = z.object({
    accessToken: z.string()
})

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type LoginInput = z.infer<typeof loginSchema>;

export const { schemas: userSchemas, $ref } = buildJsonSchemas({
    createUserSchema,
    createUserResponseSchema,
    loginSchema,
    loginResponseSchema,
}, { $id: 'UserSchema' });