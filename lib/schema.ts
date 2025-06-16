import { z } from "zod/v4";

export const PasswordGeneratorSchema = z.object({
  length: z.number().min(8).max(32),
  includeSymbols: z.boolean(),
  includeNumbers: z.boolean(),
  passwordOne: z.string().optional().readonly(),
  passwordTwo: z.string().optional().readonly(),
});

export type PasswordGeneratorType = z.infer<typeof PasswordGeneratorSchema>;
