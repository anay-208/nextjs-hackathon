import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ulid } from "ulid";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generateId = (prefix: "jorn" | "txn" | "cat" | "jorn_tag") => {
  return prefix + "_" + ulid();
};
