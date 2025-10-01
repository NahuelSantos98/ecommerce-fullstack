import { infer as zInfer } from "zod";
import {
    wishlistEntitySchema,
    wishlistItemEntitySchema,
    addWishlistItemSchema,
} from "../schemas/wishlist.schema";
import { idParamSchema } from "../schemas/_shared";

export type WishlistEntityDto = zInfer<typeof wishlistEntitySchema>;
export type WishlistItemEntityDto = zInfer<typeof wishlistItemEntitySchema>;
export type WishlistAddItemDto = zInfer<typeof addWishlistItemSchema>;
export type WishlistIdParam = zInfer<typeof idParamSchema>;
export type WishlistItemIdParam = zInfer<typeof idParamSchema>;
