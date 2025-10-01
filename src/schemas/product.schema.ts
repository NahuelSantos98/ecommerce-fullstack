import { z } from "zod";
import {
    // ✅ Traemos los helpers desde _shared para no duplicar lógica
    slugSchema,          // slug válido (minúsculas, números y guiones) + normalización
    skuSchema,           // SKU válido (A-Z, 0-9 y guiones) + normalización
    CurrencyEnum,        // enum de moneda (ej: "ARS", …)
} from "./_shared";
import { reviewPublicSchema } from "./review.schema";

// Esquemas auxiliares para inputs anidados (ej: imágenes, categorías)
// Útiles para los schemas de Create/Update (request body)
export const productImageInputSchema = z.object({
  url: z.string().url(),
  alt: z.string().max(300).optional(),
  sortOrder: z.number().int().min(0).default(0),
});

export const productCategoryRefSchema = z.object({
  slug: slugSchema,
});

export const productImagePublicSchema = z.object({
  id: z.number().int().positive(),
  url: z.string().url(),
  alt: z.string().max(300).optional(),
  sortOrder: z.number().int().min(0),
});

export const productCategoryPublicSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1).max(120),
  slug: slugSchema,
});


/**
 * Nota importante sobre `CurrencyEnum`:
 * - Si tu enum tiene más de una moneda y querés **forzar** ARS en este proyecto,
 *   podés hacer: `currency: CurrencyEnum.default("ARS").pipe(z.literal("ARS"))`
 *   o simplemente `currency: z.literal("ARS")`.
 * - En este ejemplo lo dejamos como `CurrencyEnum.default("ARS")` para usar lo que ya
 *   definiste en _shared y seguir consistentes en toda la app.
 */

// ====================================================
// Entity (nivel DB / dominio)
// ====================================================
export const productEntitySchema = z
    .object({
        id: z.number().int().positive(),
        name: z.string().min(1, "El nombre es requerido").max(120, "Máximo 120 caracteres"),
        slug: slugSchema,
        shortDescription: z.string().min(10, "La descripción corta debe tener al menos 10 caracteres").max(160, "La descripción corta no puede exceder 160 caracteres"),
        description: z.string().min(50, "La descripción debe tener al menos 50 caracteres").max(2000, "La descripción no puede exceder 2000 caracteres"),
        priceCents: z.number().int().min(1, "El precio debe ser mayor a 0").max(99_999_999, "El precio no puede superar los 999.999,99"),
        currency: CurrencyEnum.default("ARS").pipe(z.literal("ARS")),
        sku: skuSchema.optional(),
        active: z.boolean().default(true),
        stock: z.number().int("El stock debe ser un número entero").min(0, "El stock no puede ser negativo").max(1_000_000, "El stock no puede superar el 1.000.000"),
        createdAt: z.date(),
        updatedAt: z.date(),
    })
    .strict();

// ====================================================
// Create (request body)
// ====================================================
export const createProductSchema = z
    .object({
        name: z.string().min(1).max(120),
        slug: slugSchema,
        shortDescription: z.string().min(10).max(160),
        description: z.string().min(50).max(2000),
        priceCents: z.number().int().min(1).max(99_999_999),
        currency: CurrencyEnum.default("ARS").pipe(z.literal("ARS")),
        sku: skuSchema.optional(),
        active: z.boolean().default(true),
        stock: z.number().int().min(0).max(1_000_000),
        images: z.array(productImageInputSchema).default([]),
        categories: z.array(productCategoryRefSchema).default([]),
    })
    .strict();

// ====================================================
// Update (request body)
// ====================================================
// Usamos los mismos campos que Create pero opcionales.
// Podrías usar .partial() directo sobre createProductSchema, pero lo dejamos explícito.
export const updateProductSchema = createProductSchema.partial().strict();


// ====================================================
// Public (response JSON para API)
// ====================================================
// Recomendación: para respuestas públicas devolvé timestamps como string ISO.
// Mantenemos validaciones de formato, pero sin transforms innecesarios acá.
export const publicProductSchema = z
  .object({
    id: z.number().int().positive(),
    name: z.string().min(1).max(120),
    slug: slugSchema, // valida formato
    shortDescription: z.string().min(10).max(160),
    description: z.string().min(50).max(2000),
    priceCents: z.number().int().min(1).max(99_999_999),
    currency: CurrencyEnum,
    sku: z.string().min(3).max(50).regex(/^[A-Z0-9-]+$/).optional(),
    active: z.boolean(),
    stock: z.number().int().min(0).max(1_000_000),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
    images: z.array(productImagePublicSchema).default([]),
    categories: z.array(productCategoryPublicSchema).default([]),
    // Datos derivados para UI pública
    primaryImage: productImagePublicSchema.nullable().optional(),
    averageRating: z.number().min(0).max(5).optional(),
    reviewsCount: z.number().int().min(0).optional(),
    reviews: z.array(reviewPublicSchema).optional(),
  })
  .strict();

// ====================================================
// Preview público reutilizable (para listas, carrito, etc.)
// ====================================================
export const productPreviewSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1).max(120),
  slug: slugSchema,
  priceCents: z.number().int().min(0).max(99_999_999),
  currency: CurrencyEnum,
  primaryImage: z
    .object({
      id: z.number().int().positive(),
      url: z.string().url(),
      alt: z.string().max(300).optional(),
    })
    .nullable()
    .optional(),
}).strict();
