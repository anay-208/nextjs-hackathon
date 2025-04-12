"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Time, toReadableTime, validTimes } from "./time";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTransition } from "react";

export default function AmountClient({ time }: { time: Time }) {
  const otherTimes = validTimes.filter((t) => t !== time);
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [isLoading, startTransition] = useTransition();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{toReadableTime(time)}</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Available Times</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {otherTimes.map((t) => (
          <DropdownMenuItem
            disabled={isLoading}
            key={t}
            onSelect={() => {
              const params = new URLSearchParams(searchParams);
              params.set("amountTime", t);

              startTransition(() => {
                router.replace(`${pathname}?${params.toString()}`);
              });
            }}
          >
            {toReadableTime(t)}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
