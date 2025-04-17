"use client";

import { Button } from "@/components/ui/button";
import { callMeMaybe } from "./action";

type ActionButtonsProps = {};

export default function ActionButtons({}: ActionButtonsProps) {
  return (
    <>
      <Button onClick={() => callMeMaybe()}>CLick me</Button>
    </>
  );
}
