import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ulid } from "ulid";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const allowedIdPrefix = ["jorn"] as const;
export const generateId = (prefix: (typeof allowedIdPrefix)[number]) => {
  return prefix + "_" + ulid();
};
