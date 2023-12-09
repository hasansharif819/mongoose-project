import { z } from 'zod';

const userNameValidationSchema = z.object({
  firstName: z.string().min(1).max(20),
  lastName: z.string().min(1).max(20),
});

const addressValidationSchema = z.object({
  street: z.string(),
  city: z.string(),
  country: z.string(),
});

const ordersValidationSchema = z.object({
  productName: z.string(),
  price: z.number(),
  quantity: z.number(),
});

const createUserZodValidationSchema = z.object({
  userId: z.number().min(1),
  username: z.string().min(1).max(20),
  password: z.string().min(1),
  fullName: userNameValidationSchema,
  email: z.string().email(),
  age: z.number().min(1),
  isActive: z.boolean(),
  isDeleted: z.boolean().optional().default(false),
  hobbies: z.array(z.string()),
  address: addressValidationSchema,
  orders: z.array(ordersValidationSchema).optional(),
});

const updateUserZodValidationSchema = z.object({
  userId: z.number().optional(),
  username: z.string().max(20).optional(),
  password: z.string().optional(),
  fullName: userNameValidationSchema.optional(),
  email: z.string().email().optional(),
  age: z.number().min(1).optional(),
  isActive: z.boolean().optional(),
  isDeleted: z.boolean().optional().default(false),
  hobbies: z.array(z.string()).optional(),
  address: addressValidationSchema.optional(),
  orders: z.array(ordersValidationSchema).optional(),
});

// export default userZodValidationSchema;

export const userValidation = {
  createUserZodValidationSchema,
  updateUserZodValidationSchema,
  ordersValidationSchema,
};
