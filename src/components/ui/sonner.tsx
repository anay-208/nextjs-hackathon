"use client";

import { Toaster as Sonner, ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme={"light" as ToasterProps["theme"]}
      className="toaster group"
      style={
        {
          "--normal-bg": "var(--color-popover)",
          "--normal-text": "var(--color-fg)",
          "--normal-border": "var(--color-border)",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
