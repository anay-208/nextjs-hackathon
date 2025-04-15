"use client"

import { route } from "@/app/routes"
import { Input } from "@/components/ui/input"
import { useLeadingThrottle } from "@/components/useLeadingThrottle"
import { cn } from "@/lib/utils"
import { X } from "lucide-react"
import Form from "next/form"
import { useState } from "react"

export function SearchJournalForm(props: {
  children?: React.ReactNode
}) {
  return (
    <Form
      id="search-journal-form"
      action={route.journal}
      className="w-full"
      autoComplete="off"
    >
      {props.children}
    </Form>
  )
}

export function SearchJournalInput() {

  const [isBlur, setIsBlur] = useState(false)
  const [isThrottling, submitForm] = useLeadingThrottle(0, () => {
    (document.querySelector("#search-journal-form") as HTMLFormElement).requestSubmit()
  })

  return (
    <div className="relative w-full flex items-center">
      <Input
        type="text"
        name="search"
        placeholder="Search..."
        autoComplete="none"
        onChange={(e) => {
          submitForm()
          if (e.target.value.length > 0) {
            setIsBlur(false)
          } else {
            setIsBlur(true)
          }
        }}
      />
      <button
        onClick={() => {
          (document.querySelector("#search-journal-form") as HTMLFormElement).reset()
          setIsBlur(true)
        }}
        className={cn(
          "clickable",
          "absolute right-1 cursor-pointer rounded-full p-1.5 transition-all duration-200 ease-in-out hover:bg-hover text-muted hover:text-fg",
          isBlur ? "opacity-0" : "opacity-100",
          isThrottling && "animate-pulse"
        )}>
        <X size={16} />
      </button>
    </div>
  )
}