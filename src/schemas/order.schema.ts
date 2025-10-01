import { z } from "zod";
import { CurrencyEnum } from "./_shared";
import { addressPublicSchema } from "./address.schema";
import { productPreviewSchema } from "./product.schema";
import { paymentPublicSchema } from "./payment.schema";

export const OrderStatusEnum = z.enum([
    "pending_payment", "paid", "processing", "shipped", "delivered", "cancelled"
]);
export const ShippingMethodEnum = z.enum(["flat", "pickup"]);

export const orderEntitySchema = z.object({
    id: z.number().int().positive(),
    userId: z.number().int().positive(),
    cartId: z.number().int().positive(),
    totalCents: z.number().int().min(0).max(999_999_999),
    currency: CurrencyEnum.default("ARS"),
    status: OrderStatusEnum.default("pending_payment"),
    shippingMethod: ShippingMethodEnum.default("flat"),
    shippingCostCents: z.number().int().min(0).max(99_999_999),
    shippingAddressId: z.number().int().positive().nullable().optional(),
    billingAddressId: z.number().int().positive().nullable().optional(),
    createdAt: z.date(),
    updatedAt: z.date(),
}).strict();

export const orderItemEntitySchema = z.object({
    id: z.number().int().positive(),
    orderId: z.number().int().positive(),
    productId: z.number().int().positive(),
    quantity: z.number().int().min(1).max(1_000),
    unitPriceCents: z.number().int().min(0).max(99_999_999),
    createdAt: z.date(),
    updatedAt: z.date(),
}).strict();

export const orderStatusHistoryEntitySchema = z.object({
    id: z.number().int().positive(),
    orderId: z.number().int().positive(),
    fromStatus: z.string().optional(),
    toStatus: OrderStatusEnum,
    changedAt: z.date(),
    changedBy: z.number().int().positive().nullable().optional(),
}).strict();

// Checkout: crear orden desde carrito
export const checkoutSchema = z.object({
    shippingAddressId: z.number().int().positive(),
    billingAddressId: z.number().int().positive(),
    paymentMethod: z.enum(["mock", "mercadopago", "stripe"]),
}).strict();

// Patch estado admin
export const patchOrderStatusSchema = z.object({
    status: OrderStatusEnum,
}).strict();

// Público (respuesta API)
export const orderItemPublicSchema = z.object({
  id: z.number().int().positive(),
  quantity: z.number().int().min(1).max(1_000),
  unitPriceCents: z.number().int().min(0).max(99_999_999),
  product: productPreviewSchema,
}).strict();

export const orderPublicSchema = z.object({
  id: z.number().int().positive(),
  userId: z.number().int().positive(),
  cartId: z.number().int().positive(),
  status: OrderStatusEnum,
  currency: CurrencyEnum,
  totalCents: z.number().int().min(0).max(999_999_999),
  shippingMethod: ShippingMethodEnum,
  shippingCostCents: z.number().int().min(0).max(99_999_999),
  shippingAddress: addressPublicSchema.nullable().optional(),
  billingAddress: addressPublicSchema.nullable().optional(),
  items: z.array(orderItemPublicSchema).default([]),
  payments: z.array(paymentPublicSchema).default([]),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
}).strict();
