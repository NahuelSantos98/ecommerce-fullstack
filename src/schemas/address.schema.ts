import { z } from "zod";

export const addressEntitySchema = z.object({
    id: z.number().int().positive(),
    userId: z.number().int().positive(),
    label: z.string().max(100).optional(),
    line1: z.string().min(1).max(255),
    line2: z.string().max(255).optional(),
    city: z.string().min(1).max(120),
    state: z.string().max(120).optional(),
    postalCode: z.string().max(30).optional(),
    countryCode: z.string().length(2), // "AR"
    phone: z.string().max(40).optional(),
    isDefault: z.boolean().default(false),
    createdAt: z.date(),
    updatedAt: z.date(),
}).strict();

export const createAddressSchema = z.object({
    label: z.string().max(100).optional(),
    line1: z.string().min(1).max(255),
    line2: z.string().max(255).optional(),
    city: z.string().min(1).max(120),
    state: z.string().max(120).optional(),
    postalCode: z.string().max(30).optional(),
    countryCode: z.string().length(2),
    phone: z.string().max(40).optional(),
    isDefault: z.boolean().optional(),
}).strict();

export const updateAddressSchema = z.object({
    label: z.string().max(100).optional(),
    line1: z.string().min(1).max(255).optional(),
    line2: z.string().max(255).optional(),
    city: z.string().min(1).max(120).optional(),
    state: z.string().max(120).optional(),
    postalCode: z.string().max(30).optional(),
    countryCode: z.string().length(2).optional(),
    phone: z.string().max(40).optional(),
    isDefault: z.boolean().optional(),
}).strict();
