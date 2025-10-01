import {infer as zInfer} from 'zod';
import {createProductSchema, updateProductSchema, publicProductSchema} from '../schemas/product.schema';
import { idParamSchema } from '../schemas/_shared';

export type ProductCreateDto = zInfer<typeof createProductSchema>;

export type ProductUpdateDto = zInfer<typeof updateProductSchema>;

export type ProductPublicDto = zInfer<typeof publicProductSchema>;

export type ProductIdParam = zInfer<typeof idParamSchema>;