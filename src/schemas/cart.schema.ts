import { z } from "zod";
import { slugSchema, CurrencyEnum } from "./_shared";
import { productPreviewSchema } from "./product.schema";

// ===============================
// Entidades (DB / dominio)
// ===============================
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

// ===============================
// Inputs (requests)
// ===============================
export const addCartItemSchema = z.object({
  productId: z.number().int().positive(),
  quantity: z.number().int().min(1).max(1_000),
}).strict();

export const updateCartItemSchema = z.object({
  quantity: z.number().int().min(1).max(1_000),
}).strict();

// ===============================
// Públicos (respuesta API)
// ===============================
// Previsualización mínima del producto dentro del carrito
// Reutilizamos el preview público centralizado de producto

// Item del carrito con preview de producto + subtotal
export const cartItemPublicSchema = z.object({
  id: z.number().int().positive(),
  quantity: z.number().int().min(1).max(1_000),
  unitPriceCents: z.number().int().min(0).max(99_999_999),
  subtotalCents: z.number().int().min(0).max(999_999_999), // quantity * unitPriceCents (lo calcula el service)
  product: productPreviewSchema, // 👈 preview incluido
}).strict();

// Totales del carrito
export const cartTotalsSchema = z.object({
  currency: CurrencyEnum,
  itemsSubtotalCents: z.number().int().min(0),
  shippingCents: z.number().int().min(0),
  taxesCents: z.number().int().min(0),
  discountCents: z.number().int().min(0),
  grandTotalCents: z.number().int().min(0), // subtotal + shipping + taxes - discount
}).strict();

// Carrito público completo
export const cartPublicSchema = z.object({
  id: z.number().int().positive(),
  status: CartStatusEnum,
  items: z.array(cartItemPublicSchema).default([]),
  totals: cartTotalsSchema,
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
}).strict();
