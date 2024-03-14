import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required"
  }),
  password: z.string().min(2, {
    message: "Password is required"
  })
})

export enum LoginEnumSchema {
  email = "email",
  password = "password"
}

export const RegisterSchema = z.object({
  username: z.string().min(1, {
    message: "Name is required"
  }),
  email: z.string().email({
    message: "Email is required"
  }),
  password: z.string().min(2, {
    message: "Password is required"
  }),
  confirmPassword: z.string().min(2, {
    message: "Password is required"
  })
}).superRefine(({ confirmPassword, password }, ctx) => {
  if (confirmPassword !== password) {
    ctx.addIssue({
      code: "custom",
      message: "The passwords did not match",
      path: ['confirmPassword']
    });
  }
})

export const LongUrlSchema = z.object({
  url: z.string().trim().url({ message: "Invalid URL!" }),
  createdById: z.string().trim().optional()
})

export const SettingsSchema = z.object({
  username: z.optional(z.string().min(1, {
    message: "Name is required"
  })),
})
