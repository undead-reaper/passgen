import PasswordGenerator from "@/components/PasswordGenerator";
import type { PasswordGeneratorType } from "@/lib/schema";

export default function Home() {
  const defaultParams: PasswordGeneratorType = {
    length: 15,
    includeSymbols: true,
    includeNumbers: true,
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24">
      <PasswordGenerator props={defaultParams} />
    </main>
  );
}
