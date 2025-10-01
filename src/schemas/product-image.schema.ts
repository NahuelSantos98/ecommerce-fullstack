import { z } from "zod";

export const productImageEntitySchema = z.object({
    id: z.number().int().positive(),
    productId: z.number().int().positive(),
    url: z.string().url(),
    alt: z.string().max(300).optional(),
    sortOrder: z.number().int().min(0).default(0),
    createdAt: z.date(),
    updatedAt: z.date(),
}).strict();

export const createProductImageSchema = z.object({
    productId: z.number().int().positive(),
    url: z.string().url(),
    alt: z.string().max(300).optional(),
    sortOrder: z.number().int().min(0).default(0),
}).strict();

export const updateProductImageSchema = z.object({
    url: z.string().url().optional(),
    alt: z.string().max(300).optional(),
    sortOrder: z.number().int().min(0).optional(),
}).strict();
