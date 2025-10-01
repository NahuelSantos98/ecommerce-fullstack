import { infer as zInfer } from "zod";
import { paymentPublicSchema } from "../schemas/payment.schema";

export type PaymentPublicDto = zInfer<typeof paymentPublicSchema>;


