import { infer as zInfer } from "zod";
import {
    productImageEntitySchema,
    createProductImageSchema,
    updateProductImageSchema,
} from "../schemas/product-image.schema";
import { idParamSchema } from "../schemas/_shared";

export type ProductImageEntityDto = zInfer<typeof productImageEntitySchema>;
export type ProductImageCreateDto = zInfer<typeof createProductImageSchema>;
export type ProductImageUpdateDto = zInfer<typeof updateProductImageSchema>;
export type ProductImageIdParam = zInfer<typeof idParamSchema>;
