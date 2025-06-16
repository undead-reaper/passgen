"use client";

import { GeneratePasswordResult, generatePasswords } from "@/app/actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { PasswordGeneratorSchema, PasswordGeneratorType } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Copy } from "lucide-react";
import { memo, useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const PasswordGenerator = ({ props }: { props: PasswordGeneratorType }) => {
  const [isPending, startTransition] = useTransition();
  const form = useForm<PasswordGeneratorType>({
    resolver: zodResolver(PasswordGeneratorSchema),
    defaultValues: {
      passwordOne: "",
      passwordTwo: "",
      ...props,
    },
  });

  useEffect(() => {
    startTransition(async () => {
      const result = await generatePasswords(props);
      manageTransition(result);
    });
  }, []);

  const manageTransition = (result: GeneratePasswordResult) => {
    if (result.error) {
      toast.error("Could not generate passwords", {
        description: result.error,
      });
    } else {
      toast.success("Passwords generated successfully", {
        description: "Your passwords have been generated.",
      });
      form.setValue("passwordOne", result.passwords![0]);
      form.setValue("passwordTwo", result.passwords![1]);
    }
    console.log("Generated Passwords:", result);
  };

  const onSubmit = async (values: PasswordGeneratorType) => {
    startTransition(async () => {
      const result = await generatePasswords(values);
      manageTransition(result);
    });
  };

  const copyToClipboard = (value: string) => {
    navigator.clipboard
      .writeText(value)
      .then(() => {
        toast.success("Password copied to clipboard", {
          description: "You can now paste it wherever you need.",
        });
      })
      .finally(() => {
        console.log("Password copied to clipboard:", value);
      });
  };

  return (
    <Form {...form}>
      <form className="w-full max-w-sm" onSubmit={form.handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle>Password Generator</CardTitle>
            <CardDescription>
              Generate secure passwords with ease
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="length"
              disabled={isPending}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex flex-row items-center justify-between">
                    <p>Password Length</p>
                    <p>{field.value} characters</p>
                  </FormLabel>
                  <FormControl>
                    <Slider
                      min={8}
                      max={32}
                      step={1}
                      value={[field.value]}
                      className="my-2"
                      onValueChange={(values) => field.onChange(values[0])}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="includeSymbols"
              disabled={isPending}
              render={({ field }) => (
                <FormItem className="flex flex-row items-center gap-2 py-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>Include Symbols (@#$%)</FormLabel>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="includeNumbers"
              disabled={isPending}
              render={({ field }) => (
                <FormItem className="flex flex-row items-center gap-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>Include Numbers (0-9)</FormLabel>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="passwordOne"
              disabled={isPending}
              render={({ field }) => (
                <FormItem className="mt-6">
                  <FormLabel>Password 1</FormLabel>
                  <div className="flex flex-row items-center gap-2">
                    <FormControl>
                      <Input
                        type="visiblePassword"
                        readOnly
                        value={field.value}
                        className="font-mono"
                        placeholder="Generated password will appear here"
                      />
                    </FormControl>
                    <Button
                      size="icon"
                      type="button"
                      variant="outline"
                      disabled={!field.value || isPending}
                      onClick={() => copyToClipboard(field.value!)}
                      aria-label="Copy password 1"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="passwordTwo"
              disabled={isPending}
              render={({ field }) => (
                <FormItem className="mt-2">
                  <FormLabel>Password 2</FormLabel>
                  <div className="flex flex-row items-center gap-2">
                    <FormControl className="flex flex-row items-center gap-2">
                      <Input
                        type="visiblePassword"
                        readOnly
                        value={field.value}
                        className="font-mono"
                        placeholder="Generated password will appear here"
                      />
                    </FormControl>
                    <Button
                      size="icon"
                      type="button"
                      variant="outline"
                      disabled={!field.value || isPending}
                      onClick={() => copyToClipboard(field.value!)}
                      aria-label="Copy password 2"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              Generate Passwords
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};

export default memo(PasswordGenerator);
