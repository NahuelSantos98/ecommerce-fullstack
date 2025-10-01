import { infer as zInfer } from "zod";
import {
    orderEntitySchema,
    orderItemEntitySchema,
    orderStatusHistoryEntitySchema,
    checkoutSchema,
    patchOrderStatusSchema,
} from "../schemas/order.schema";
import { idParamSchema } from "../schemas/_shared";

export type OrderEntityDto = zInfer<typeof orderEntitySchema>;
export type OrderItemEntityDto = zInfer<typeof orderItemEntitySchema>;
export type OrderStatusHistoryDto = zInfer<typeof orderStatusHistoryEntitySchema>;
export type CheckoutDto = zInfer<typeof checkoutSchema>;
export type PatchOrderStatusDto = zInfer<typeof patchOrderStatusSchema>;
export type OrderIdParam = zInfer<typeof idParamSchema>;
export type OrderItemIdParam = zInfer<typeof idParamSchema>;
export type OrderStatusHistoryIdParam = zInfer<typeof idParamSchema>;
