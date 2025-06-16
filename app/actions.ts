"use server";

import { PasswordGeneratorSchema, PasswordGeneratorType } from "@/lib/schema";
import crypto from "crypto";

export interface GeneratePasswordResult {
  passwords?: [string, string];
  error?: string;
}

function generateSinglePassword({
  length,
  includeSymbols,
  includeNumbers,
}: PasswordGeneratorType): string {
  const lowercaseChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numberChars = "0123456789";
  const symbolChars = "!@#$%^&*()_+[]{}|;:',.<>?`~";

  let characterSpace = lowercaseChars;
  if (includeNumbers) characterSpace += numberChars;
  if (includeSymbols) characterSpace += symbolChars;

  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = crypto.randomInt(0, characterSpace.length);
    password += characterSpace[randomIndex];
  }
  return password;
}

export async function generatePasswords(
  params: Partial<PasswordGeneratorType>
): Promise<GeneratePasswordResult> {
  const parsed = PasswordGeneratorSchema.safeParse(params);

  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;
    return { error: "Validation Failed", ...fieldErrors };
  }

  const { length, includeSymbols, includeNumbers } = parsed.data;

  try {
    const passwordOne = generateSinglePassword({
      length,
      includeSymbols,
      includeNumbers,
    });
    const passwordTwo = generateSinglePassword({
      length,
      includeSymbols,
      includeNumbers,
    });
    return { passwords: [passwordOne, passwordTwo] };
  } catch (error) {
    console.error("Error generating passwords:", error);
    return {
      error: "Failed to generate passwords",
    };
  }
}
