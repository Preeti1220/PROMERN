
import { z } from 'zod';

export const loginSchema = z.object({
    email: z
        .string({ required_error: "email is required" })
        .trim()
        .min(3, { message: "email must atleast 5 character" })
        .max(255, { message: "email must not be more than 255 character" }),

    password: z
        .string({ required_error: "password is required" })
        .trim()
        .min(6, { message: "password must be atleast 3 character" })
        .max(1024, { message: "password must not be more than 1024 character" })
});

export const signupSchema = loginSchema.extend({
    username: z
        .string({ required_error: "Name is required" })
        .trim()
        .min(3, { message: "Name must atleast 3 character" })
        .max(255, { message: "Name must not be more than 255 character" }),
    phone: z
        .string({ required_error: "phone is required" })
        .trim()
        .min(10, { message: "phone must atleast 10 Numbers" })
        .max(20, { message: "phone must not be more than 20 Numbers" }),
});

// export default { signupSchema, loginSchema };