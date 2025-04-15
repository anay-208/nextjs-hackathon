"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Time, toReadableTime } from "./time";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTransition } from "react";

export function TimeDropdown({
  currentTime,
  otherTimes,
}: {
  currentTime: Time;
  otherTimes: Time[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [isLoading, startTransition] = useTransition();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="border-border-strong rounded-md border px-2">
        {toReadableTime(currentTime)}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Available Times</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {otherTimes.map((t) => (
          <DropdownMenuItem
            disabled={isLoading}
            key={t}
            onSelect={() => {
              const params = new URLSearchParams(searchParams);
              params.set("timeFrame", t);

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
