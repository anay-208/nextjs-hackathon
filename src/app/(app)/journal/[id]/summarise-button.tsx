"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";



export default function SummariseButton(){
    return (
        <Button
        className={cn("bg-purple-600 hover:bg-purple-700 text-white flex items-center gap-2")}
        
      >
        <Sparkles className="h-4 w-4" />
        Summarise with AI
      </Button>
    )
}