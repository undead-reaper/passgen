import PasswordGenerator from "@/components/PasswordGenerator";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24">
      <h1 className="mb-8 text-3xl font-bold">Password Generator</h1>
      <PasswordGenerator />
    </main>
  );
}
