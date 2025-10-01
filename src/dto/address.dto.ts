import { infer as zInfer } from "zod";
import { addressPublicSchema } from "../schemas/address.schema";

export type AddressPublicDto = zInfer<typeof addressPublicSchema>;


