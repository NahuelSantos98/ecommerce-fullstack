import { z } from "zod";

export const InventoryReasonEnum = z.enum(["manual", "order_reserve", "order_commit", "order_cancel"]);

export const inventoryMovementEntitySchema = z.object({
    id: z.number().int().positive(),
    productId: z.number().int().positive(),
    changeQty: z.number().int(), // + ingreso / - egreso
    reason: InventoryReasonEnum,
    metadata: z.any().optional(),
    createdAt: z.date(),
}).strict();

export const createInventoryMovementSchema = z.object({
    productId: z.number().int().positive(),
    changeQty: z.number().int(),
    reason: InventoryReasonEnum,
    metadata: z.any().optional(),
}).strict();
