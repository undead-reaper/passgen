import { parseUrl } from "next/dist/shared/lib/router/utils/parse-url";
import useSWR, { SWRResponse } from "swr";

const fetcher = async (url: string) => {
  const res = await fetch(url);

  if (!res.ok) {
    const error = new Error("An error occurred while generating passwords");
    error.message = await res.text();
    error.cause = res.status;
    throw error;
  }
  return res.json();
};

export function generatePasswords({
  length = 15,
  includeSymbols = true,
  includeNumbers = true,
  count = 2,
}: PasswordQuery): SWRResponse {
  const params = new URLSearchParams({
    length: length.toString(),
    symbols: includeSymbols.toString(),
    numbers: includeNumbers.toString(),
    count: count.toString(),
  });

  const uri = parseUrl(`/api/generate?${params.toString()}`);

  const { data, error, isLoading, mutate, isValidating } = useSWR(
    uri.href,
    fetcher,
    {
      shouldRetryOnError: false,
      revalidateOnFocus: false,
      refreshInterval: 0,
    }
  );
  const response: SWRResponse = {
    data,
    error,
    isLoading,
    mutate,
    isValidating,
  };
  return response;
}
