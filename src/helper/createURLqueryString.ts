import { ReadonlyURLSearchParams } from "next/navigation";

export const createQueryString = (
  searchParams: URLSearchParams | ReadonlyURLSearchParams,
  name: string,
  value: string
): string => {
  const params = new URLSearchParams(searchParams.toString());
  params.set(name, value);

  return "?" + params.toString();
};
