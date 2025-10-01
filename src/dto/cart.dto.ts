import { infer as zInfer } from "zod";
import {
    cartEntitySchema,
    cartItemEntitySchema,
    addCartItemSchema,
    updateCartItemSchema,
} from "../schemas/cart.schema";
import { idParamSchema } from "../schemas/_shared";

export type CartEntityDto = zInfer<typeof cartEntitySchema>;
export type CartItemEntityDto = zInfer<typeof cartItemEntitySchema>;
export type CartAddItemDto = zInfer<typeof addCartItemSchema>;
export type CartUpdateItemDto = zInfer<typeof updateCartItemSchema>;
export type CartIdParam = zInfer<typeof idParamSchema>;
export type CartItemIdParam = zInfer<typeof idParamSchema>;
