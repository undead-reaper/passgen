"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { generatePasswords } from "@/stores/PasswordStore";
import { Copy, Loader2 } from "lucide-react";
import { memo, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

const PasswordGenerator = () => {
  const [passwordLength, setPasswordLength] = useState(15);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [passwords, setPasswords] = useState<string[]>([]);

  const password1Ref = useRef<HTMLInputElement>(null);
  const password2Ref = useRef<HTMLInputElement>(null);

  const { isLoading, data, error, mutate } = generatePasswords({
    length: passwordLength,
    includeSymbols,
    includeNumbers,
  });

  if (error) {
    toast.error("Error generating passwords", {
      description: error.message,
    });
  }

  useEffect(() => {
    if (data && data.passwords) {
      setPasswords(data.passwords);
      const password1 = data.passwords[0];
      const password2 = data.passwords[1];
      if (password1Ref.current) {
        password1Ref.current.value = password1;
      }
      if (password2Ref.current) {
        password2Ref.current.value = password2;
      }
    }
  }, [data]);

  async function handleGeneratePassword() {
    await mutate().then(() => {
      if (!error) {
        toast("Password Generated", {
          description: "Two new passwords have been generated.",
        });
      } else {
        toast.error("Error generating passwords", {
          description: error.message,
        });
      }
    });
  }

  function copyToClipboard({
    password,
    index,
  }: {
    password: string;
    index: number;
  }) {
    navigator.clipboard.writeText(password).then((_) => {
      toast("Copied to clipboard", {
        description: `Password ${index + 1} copied to clipboard`,
      });
    });
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Password Generator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password-length">Password Length</Label>
              <span className="text-sm font-medium">
                {passwordLength} characters
              </span>
            </div>
            <Slider
              id="password-length"
              min={8}
              max={32}
              disabled={isLoading}
              step={1}
              value={[passwordLength]}
              onValueChange={(value) => setPasswordLength(value[0])}
              className="py-2"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="include-symbols"
                checked={includeSymbols}
                disabled={isLoading}
                onCheckedChange={(checked: boolean) =>
                  setIncludeSymbols(checked)
                }
              />
              <Label htmlFor="include-symbols">Include Symbols (@#$%)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="include-numbers"
                checked={includeNumbers}
                disabled={isLoading}
                onCheckedChange={(checked: boolean) =>
                  setIncludeNumbers(checked)
                }
              />
              <Label htmlFor="include-numbers">Include Numbers (0-9)</Label>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="password-1">Password 1</Label>
            <div className="flex items-center space-x-2">
              <Input
                id="password-1"
                ref={password1Ref}
                readOnly
                disabled={isLoading}
                className="font-mono"
                placeholder="Generated password will appear here"
              />
              <Button
                size="icon"
                variant="outline"
                onClick={() =>
                  copyToClipboard({ password: passwords[0], index: 0 })
                }
                disabled={!passwords[0] || isLoading}
                aria-label="Copy password 1"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password-2">Password 2</Label>
            <div className="flex items-center space-x-2">
              <Input
                id="password-2"
                ref={password2Ref}
                readOnly
                disabled={isLoading}
                className="font-mono"
                placeholder="Generated password will appear here"
              />
              <Button
                size="icon"
                variant="outline"
                onClick={() =>
                  copyToClipboard({ password: passwords[1], index: 1 })
                }
                disabled={!passwords[1] || isLoading}
                aria-label="Copy password 2"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleGeneratePassword}
          disabled={isLoading}
          className="w-full"
        >
          {isLoading && <Loader2 />}
          {isLoading ? "Generating Passwords..." : "Generate Passwords"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default memo(PasswordGenerator);
