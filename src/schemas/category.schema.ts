import { z } from "zod";
import { slugSchema } from "./_shared";
import { productPreviewSchema } from "./product.schema";

export const categoryEntitySchema = z.object({
    id: z.number().int().positive(),
    name: z.string().min(1).max(120),
    slug: slugSchema,
    parentId: z.number().int().positive().nullable().optional(),
}).strict();

export const createCategorySchema = z.object({
    name: z.string().min(1).max(120),
    slug: slugSchema,
    parentId: z.number().int().positive().nullable().optional(),
}).strict();

export const updateCategorySchema = z.object({
    name: z.string().min(1).max(120).optional(),
    slug: slugSchema.optional(),
    parentId: z.number().int().positive().nullable().optional(),
}).strict();

// Tabla pivote N:M
export const productCategoryEntitySchema = z.object({
    productId: z.number().int().positive(),
    categoryId: z.number().int().positive(),
}).strict();

// Público (respuesta API) con jerarquía y productos (preview)
export const categoryPublicSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1).max(120),
  slug: slugSchema,
  parent: z
    .object({ id: z.number().int().positive(), name: z.string(), slug: slugSchema })
    .nullable()
    .optional(),
  children: z
    .array(z.object({ id: z.number().int().positive(), name: z.string(), slug: slugSchema }))
    .optional()
    .default([]),
  products: z.array(productPreviewSchema).optional().default([]),
}).strict();
