import { z } from "zod";

export const bookSchema = z.object({
  title: z.string().min(2),

  slug: z.string().min(2),

  author: z.string().min(2),

  language: z.string().optional(),

  isbn: z.string().optional(),

  description: z.string().min(10),

  mrp: z.number(),

  price: z.number(),

  stock: z.number(),

  image: z.string().optional(),

  categoryId: z.string(),

  featured: z.boolean(),

  bestseller: z.boolean(),

  isActive: z.boolean(),
});

export type BookInput =
  z.infer<typeof bookSchema>;