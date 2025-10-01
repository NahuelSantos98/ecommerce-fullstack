import { infer as zInfer } from "zod";
import {
    categoryEntitySchema,
    createCategorySchema,
    updateCategorySchema,
    productCategoryEntitySchema,
    categoryPublicSchema,
} from "../schemas/category.schema";
import { idParamSchema } from "../schemas/_shared";

export type CategoryEntityDto = zInfer<typeof categoryEntitySchema>;
export type CategoryCreateDto = zInfer<typeof createCategorySchema>;
export type CategoryUpdateDto = zInfer<typeof updateCategorySchema>;
export type ProductCategoryEntityDto = zInfer<typeof productCategoryEntitySchema>;
export type CategoryIdParam = zInfer<typeof idParamSchema>;
export type CategoryPublicDto = zInfer<typeof categoryPublicSchema>;
