import { infer as zInfer } from "zod";
import { registerUserSchema, loginSchema, updateUserSchema, userPublicSchema, wishlistLightSchema } from "../schemas/user.schema";
import { idParamSchema } from '../schemas/_shared';


export type RegisterUserDto = zInfer<typeof registerUserSchema>;

export type LoginUserDto = zInfer<typeof loginSchema>

export type UpdateUserDto = zInfer<typeof updateUserSchema>

export type UserPublicDto = zInfer<typeof userPublicSchema>
export type UserWishlistLightDto = zInfer<typeof wishlistLightSchema>

export type UserIdParam = zInfer<typeof idParamSchema>