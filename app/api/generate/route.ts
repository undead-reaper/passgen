import { NextRequest, NextResponse } from "next/server";

const alphabets = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const symbols = "!@#$%^&*()_+[]{}|;:',.<>?`~";
const numbers = "0123456789";

function generateRandomPassword(
  length: number,
  characterSpace: string[]
): string {
  let result = "";
  for (let i = 0; i < length; i++) {
    const char =
      characterSpace[Math.floor(Math.random() * characterSpace.length)];
    result += char;
  }
  return result;
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const searchParams = request.nextUrl.searchParams;
    const useSymbols = searchParams.get("symbols") === "true";
    const useNumbers = searchParams.get("numbers") === "true";
    const length = Math.min(
      Math.max(parseInt(searchParams.get("length") || "15", 10), 8),
      32
    );
    const count = parseInt(searchParams.get("count") || "2", 10);
    const result = [];

    let characterSpace = alphabets;

    if (useNumbers) characterSpace += numbers;

    if (useSymbols) characterSpace += symbols;

    const characters = characterSpace.split("");

    for (let i = 0; i < count; i++) {
      const password = generateRandomPassword(length, characters);
      result.push(password);
    }

    return NextResponse.json(
      { count, length, useSymbols, useNumbers, passwords: result },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error generating passwords:", error);
    return NextResponse.json(
      { error: "Failed to generate passwords" },
      { status: 500 }
    );
  }
}
