import { z } from "zod";
import { userLightSchema } from "./user.schema";

export const reviewEntitySchema = z.object({
    id: z.number().int().positive(),
    productId: z.number().int().positive(),
    userId: z.number().int().positive(),
    rating: z.number().int().min(1).max(5),
    title: z.string().min(1).max(150).optional(),
    comment: z.string().min(1).max(4000).optional(),
    isApproved: z.boolean().default(true),
    createdAt: z.date(),
    updatedAt: z.date(),
}).strict();

export const createReviewSchema = z.object({
    rating: z.number().int().min(1).max(5),
    title: z.string().min(1).max(150).optional(),
    comment: z.string().min(1).max(4000).optional(),
}).strict();

export const updateReviewSchema = z.object({
    rating: z.number().int().min(1).max(5).optional(),
    title: z.string().min(1).max(150).optional(),
    comment: z.string().min(1).max(4000).optional(),
    isApproved: z.boolean().optional(), // admin/mod
}).strict();

// Público (respuesta API) con usuario light
export const reviewPublicSchema = z.object({
  id: z.number().int().positive(),
  productId: z.number().int().positive(),
  user: userLightSchema, // nombre visible
  rating: z.number().int().min(1).max(5),
  title: z.string().min(1).max(150).optional(),
  comment: z.string().min(1).max(4000).optional(),
  createdAt: z.string().datetime(),
}).strict();
