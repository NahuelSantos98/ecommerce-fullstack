import { z } from "zod";
import { CurrencyEnum } from "./_shared";

export const PaymentProviderEnum = z.enum(["mercadopago", "stripe"]);
export const PaymentStatusEnum = z.enum(["created", "pending", "paid", "failed", "refunded", "cancelled"]);

export const paymentEntitySchema = z.object({
    id: z.number().int().positive(),
    orderId: z.number().int().positive(),
    provider: PaymentProviderEnum,
    providerPaymentId: z.string().max(128).nullable().optional(),
    status: PaymentStatusEnum.default("created"),
    amountCents: z.number().int().min(0).max(999_999_999),
    currency: CurrencyEnum.default("ARS"),
    metadata: z.any().optional(),
    createdAt: z.date(),
    updatedAt: z.date(),
}).strict();

export const paymentEventEntitySchema = z.object({
    id: z.number().int().positive(),
    paymentId: z.number().int().positive(),
    providerEventId: z.string().max(128).nullable().optional(),
    eventType: z.string().min(1).max(64),
    raw: z.any(),
    createdAt: z.date(),
}).strict();

// Inicializar pago real
export const initPaymentSchema = z.object({
    provider: PaymentProviderEnum,
}).strict();

// Webhooks (payloads genéricos; podés especializar según proveedor)
export const webhookBaseSchema = z.object({
    id: z.string().optional(),
    type: z.string().optional(),
}).passthrough();
