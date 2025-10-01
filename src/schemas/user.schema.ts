// src/schemas/user.schema.ts
import { z } from "zod";

// ====================================================
// Roles permitidos
// ====================================================
export const UserAllowedRoles = z.enum(["admin", "customer"], {
  message: "Rol inválido. Debe ser admin o customer",
});

// ====================================================
// Entity (nivel DB / dominio)
// ====================================================
// - Incluye passwordHash, timestamps como Date.
// - NO se expone al cliente directamente.
export const userEntitySchema = z
  .object({
    id: z.number().int().positive(),
    email: z.string().email().transform((e) => e.trim().toLowerCase()),
    passwordHash: z.string().min(60).max(200), // bcrypt hash
    firstName: z.string().min(1).max(120),
    lastName: z.string().min(1).max(120),
    phone: z.string().max(40).optional(),
    role: UserAllowedRoles.default("customer"),
    createdAt: z.date(),
    updatedAt: z.date(),
  })
  .strict();

// ====================================================
// Register (request body)
// ====================================================
export const registerUserSchema = z
  .object({
    email: z.string().email().transform((e) => e.trim().toLowerCase()),
    password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
    firstName: z.string().min(1).max(120),
    lastName: z.string().min(1).max(120),
    phone: z.string().max(40).optional(),
  })
  .strict();

// ====================================================
// Login (request body)
// ====================================================
export const loginSchema = z
  .object({
    email: z.string().email().transform((e) => e.trim().toLowerCase()),
    password: z.string().min(8),
  })
  .strict();

// ====================================================
// Update (request body)
// ====================================================
export const updateUserSchema = z
  .object({
    firstName: z.string().min(1).max(120).optional(),
    lastName: z.string().min(1).max(120).optional(),
    phone: z.string().max(40).optional(),
  })
  .partial()
  .strict();

// ====================================================
// Public (respuesta JSON para API)
// ====================================================
// - No incluye passwordHash.
// - Timestamps como string ISO (porque viajan en JSON).
// - Incluye wishlist "light" si querés devolverla junto al user.
export const wishlistLightSchema = z.object({
  id: z.number().int().positive(),
  createdAt: z.string().datetime(),
});

export const userPublicSchema = z
  .object({
    id: z.number().int().positive(),
    email: z.string().email(),
    firstName: z.string(),
    lastName: z.string(),
    phone: z.string().optional(),
    role: UserAllowedRoles,
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
    wishlist: wishlistLightSchema.nullable().optional(), // ← así devolvés {id, createdAt}
  })
  .strict();

// ====================================================
// Light (uso en relaciones públicas)
// ====================================================
export const userLightSchema = z
  .object({
    id: z.number().int().positive(),
    firstName: z.string(),
    lastName: z.string(),
  })
  .strict();
