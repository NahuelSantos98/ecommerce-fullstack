import { z } from "zod";

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
