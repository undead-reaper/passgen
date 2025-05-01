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
import { Copy } from "lucide-react";

const PasswordGenerator = () => {
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
              <span className="text-sm font-medium">15 characters</span>
            </div>
            <Slider
              id="password-length"
              min={8}
              max={32}
              step={1}
              value={[15]}
              className="py-2"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="include-symbols" />
              <Label htmlFor="include-symbols">Include Symbols (@#$%)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="include-numbers" />
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
                readOnly
                className="font-mono"
                placeholder="Generated password will appear here"
              />
              <Button
                size="icon"
                variant="outline"
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
                readOnly
                className="font-mono"
                placeholder="Generated password will appear here"
              />
              <Button
                size="icon"
                variant="outline"
                aria-label="Copy password 2"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Generate Passwords</Button>
      </CardFooter>
    </Card>
  );
};

export default PasswordGenerator;
