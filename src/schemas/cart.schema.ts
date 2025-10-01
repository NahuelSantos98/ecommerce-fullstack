import { z } from "zod";

export const CartStatusEnum = z.enum(["active", "converted", "abandoned"]);

export const cartEntitySchema = z.object({
    id: z.number().int().positive(),
    userId: z.number().int().positive().nullable().optional(), // null si guest
    guestId: z.string().min(10).max(64).nullable().optional(),
    status: CartStatusEnum.default("active"),
    createdAt: z.date(),
    updatedAt: z.date(),
}).strict();

export const cartItemEntitySchema = z.object({
    id: z.number().int().positive(),
    cartId: z.number().int().positive(),
    productId: z.number().int().positive(),
    quantity: z.number().int().min(1).max(1_000),
    unitPriceCents: z.number().int().min(0).max(99_999_999),
    createdAt: z.date(),
    updatedAt: z.date(),
}).strict();

export const addCartItemSchema = z.object({
    productId: z.number().int().positive(),
    quantity: z.number().int().min(1).max(1_000),
}).strict();

export const updateCartItemSchema = z.object({
    quantity: z.number().int().min(1).max(1_000),
}).strict();
