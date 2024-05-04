import {z} from "zod";

export const signInInputSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(6, 'Password must have at least 6 characters')
    .max(20, 'Password max length should be 20 characters'),
})

export const signUpInputSchema = z.object({
  name: z
    .string()
    .min(2, 'Username must have at least 2 characters')
    .max(10, 'Username max length should be 10 characters')
  ,
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(6, 'Password must have at least 6 characters')
    .max(20, 'Password max length should be 20 characters'),
})

export interface IZodError {
  email?: string[] | undefined;
  password?: string[] | undefined;
  name?: string[] | undefined;
}
