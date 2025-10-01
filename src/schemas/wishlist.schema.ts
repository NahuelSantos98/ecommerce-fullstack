import { z } from "zod";
import { productPreviewSchema } from "./product.schema";

export const wishlistEntitySchema = z.object({
    id: z.number().int().positive(),
    userId: z.number().int().positive(),
    createdAt: z.date(),
}).strict();

export const wishlistItemEntitySchema = z.object({
    id: z.number().int().positive(),
    wishlistId: z.number().int().positive(),
    productId: z.number().int().positive(),
    createdAt: z.date(),
}).strict();

export const addWishlistItemSchema = z.object({
    productId: z.number().int().positive(),
}).strict();

// Público (respuesta API)
export const wishlistPublicSchema = z.object({
  id: z.number().int().positive(),
  createdAt: z.string().datetime(),
  items: z
    .array(
      z.object({
        id: z.number().int().positive(),
        product: productPreviewSchema,
        createdAt: z.string().datetime(),
      })
    )
    .default([]),
}).strict();
