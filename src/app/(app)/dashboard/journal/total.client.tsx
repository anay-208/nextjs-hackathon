"use client";

import { useEffect } from "react";
import { toast } from "sonner";

export default function Total({ totalRecords }: { totalRecords: number }) {
  useEffect(() => {
    toast.success(`Found ${totalRecords} records!`);
  }, [totalRecords]);
  return <></>;
}
