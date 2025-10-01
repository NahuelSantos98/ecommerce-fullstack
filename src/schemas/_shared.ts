import { z } from "zod";

// Monedas soportadas (MVP)
export const CurrencyEnum = z.enum(["ARS"]);

// Slug url-friendly (minusculas, numeros, guiones)
export const slugSchema = z
    .string()
    .min(1, "El slug es requerido")
    .max(160, "Máximo 160 caracteres")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Solo minúsculas, números y guiones")
    .transform((s) => s.trim().toLowerCase());

// SKU interno: MAYÚSCULAS-NÚMEROS-GUIONES
export const skuSchema = z
    .string()
    .min(3, "SKU mínimo 3 caracteres")
    .max(50, "SKU máximo 50 caracteres")
    .regex(/^[A-Z0-9-]+$/, "Solo MAYÚSCULAS, números y guiones")
    .transform((s) => s.toUpperCase());

// Helpers de params
export const idParamSchema = z.object({
    id: z.coerce.number().int().positive(),
});
export type IdParam = z.infer<typeof idParamSchema>;
