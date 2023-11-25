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

// const ordersSchema = z.object({
//   productName: z.string(),
//   price: z.number(),
//   quantity: z.number(),
// });

const userZodValidationSchema = z.object({
  userId: z.number().min(1).max(20),
  username: z.string().min(1).max(20),
  password: z.string().min(1),
  fullName: userNameValidationSchema,
  email: z.string().email(),
  age: z.number().min(1),
  isActive: z.boolean(),
  isDeleted: z.boolean(),
  hobbies: z.array(z.string()),
  address: addressValidationSchema,
  orders: z.array(ordersValidationSchema),
});

export default userZodValidationSchema;
