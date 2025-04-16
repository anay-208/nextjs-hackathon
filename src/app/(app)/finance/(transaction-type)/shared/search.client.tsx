"use client";

import { Input } from "@/components/ui/input";
import { useLeadingThrottle } from "@/components/useLeadingThrottle";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import Form from "next/form";
import { useState } from "react";

export function SearchFinanceForm(props: {
  children?: React.ReactNode;
  route: string;
}) {
  return (
    <Form
      id="search-finance-form"
      action={props.route}
      className="w-full"
      autoComplete="off"
    >
      {props.children}
    </Form>
  );
}

export function SearchFinanceInput() {
  const [isBlur, setIsBlur] = useState(false);
  const [isThrottling, submitForm] = useLeadingThrottle(0, () => {
    (
      document.querySelector("#search-finance-form") as HTMLFormElement
    ).requestSubmit();
  });

  return (
    <div className="relative flex w-full items-center">
      <Input
        type="text"
        name="search"
        placeholder="Search..."
        autoComplete="none"
        onChange={(e) => {
          submitForm();
          if (e.target.value.length > 0) {
            setIsBlur(false);
          } else {
            setIsBlur(true);
          }
        }}
      />
      <button
        onClick={() => {
          (
            document.querySelector("#search-finance-form") as HTMLFormElement
          ).reset();
          setIsBlur(true);
        }}
        className={cn(
          "clickable",
          "hover:bg-hover text-muted hover:text-fg absolute right-1 cursor-pointer rounded-full p-1.5 transition-all duration-200 ease-in-out",
          isBlur ? "opacity-0" : "opacity-100",
          isThrottling && "animate-pulse",
        )}
      >
        <X size={16} />
      </button>
    </div>
  );
}
