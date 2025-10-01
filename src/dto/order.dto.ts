import { infer as zInfer } from "zod";
import {
    orderEntitySchema,
    orderItemEntitySchema,
    orderStatusHistoryEntitySchema,
    checkoutSchema,
    patchOrderStatusSchema,
    orderPublicSchema,
    orderItemPublicSchema,
} from "../schemas/order.schema";
import { idParamSchema } from "../schemas/_shared";
import { addressPublicSchema } from "../schemas/address.schema";
import { paymentPublicSchema } from "../schemas/payment.schema";

export type OrderEntityDto = zInfer<typeof orderEntitySchema>;
export type OrderItemEntityDto = zInfer<typeof orderItemEntitySchema>;
export type OrderStatusHistoryDto = zInfer<typeof orderStatusHistoryEntitySchema>;
export type CheckoutDto = zInfer<typeof checkoutSchema>;
export type PatchOrderStatusDto = zInfer<typeof patchOrderStatusSchema>;
export type OrderIdParam = zInfer<typeof idParamSchema>;
export type OrderItemIdParam = zInfer<typeof idParamSchema>;
export type OrderStatusHistoryIdParam = zInfer<typeof idParamSchema>;
export type OrderPublicDto = zInfer<typeof orderPublicSchema>;
export type OrderItemPublicDto = zInfer<typeof orderItemPublicSchema>;
export type AddressPublicDto = zInfer<typeof addressPublicSchema>;
export type PaymentPublicDto = zInfer<typeof paymentPublicSchema>;
