import { infer as zInfer } from "zod";
import {
    reviewEntitySchema,
    createReviewSchema,
    updateReviewSchema,
    reviewPublicSchema,
} from "../schemas/review.schema";
import { idParamSchema } from "../schemas/_shared";

export type ReviewEntityDto = zInfer<typeof reviewEntitySchema>;
export type ReviewCreateDto = zInfer<typeof createReviewSchema>;
export type ReviewUpdateDto = zInfer<typeof updateReviewSchema>;
export type ReviewIdParam = zInfer<typeof idParamSchema>;
export type ReviewPublicDto = zInfer<typeof reviewPublicSchema>;
