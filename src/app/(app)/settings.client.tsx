"use client"

import { useEffect, useState } from "react"
import { MaterialSymbolsLightSettings, SidebarButtonBase } from "./sidebar"
import { Cross, LogOut, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Portal } from "@radix-ui/react-portal"
import { logout } from "./settings.action"

export function SettingsClient(props: {
}) {

  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (isOpen) {
      function onEscapeKeyDown(e: KeyboardEvent) {
        if (e.key === 'Escape') setIsOpen(false)
        window.removeEventListener('keydown', onEscapeKeyDown)
      }
      window.addEventListener('keydown', onEscapeKeyDown)

      const appLayout = document.querySelector("#app-layout") as HTMLElement
      appLayout.dataset['settingOpen'] = ''

      return () => {
        window.removeEventListener('keydown', onEscapeKeyDown)
      }
    }
    if (!isOpen) {
      const appLayout = document.querySelector("#app-layout") as HTMLElement
      delete appLayout.dataset['settingOpen']
    }
  }, [isOpen])


  return (
    <>
      <SidebarButtonBase
        href={'#'}
        icon={<MaterialSymbolsLightSettings className="size-6" />}
        label={"Settings"}
        onClick={() => {
          setIsOpen(true)
        }}
      />
      <Portal>
        <div className={cn(
          "bg-[color-mix(in_srgb,var(--color-main-4)_5%,#fff)] fixed inset-0 z-20 transition-all",
          isOpen ? "opacity-100 scale-100" : "opacity-0 scale-110 pointer-events-none",
        )}>
          {isOpen && (
            <SettingsContent
              setIsOpen={setIsOpen}
              isOpen={isOpen}
            />
          )}
        </div>
      </Portal>
    </>
  )
}




function SettingsContent(props: {
  setIsOpen: (isOpen: boolean) => void
  isOpen: boolean
}) {
  return (
    <div className="flex gap-4 items-start max-w-[860px] px-4 pt-20 h-full mx-auto">
      {/* Tab List */}
      <div className="bg-transparent p-1 w-40 rounded-xl flex flex-col gap-px">
        <div className="p-1.5 px-3 font-medium bg-main-3/18 rounded-md text-fg">
          Accounts
        </div>
        <hr className="border border-border my-2" />
        <button
          onClick={async () => {
            await logout()
          }}
          className="p-1.5 px-3 font-medium rounded-md hover:bg-hover text-fg flex gap-2 items-center clickable select-none">
          <LogOut size={16} />
          Log out
        </button>
      </div>

      {/* Tab Content */}
      <div className="bg-white p-8 w-40 rounded-xl grow">

        <div className="text-lg font-semibold">
          Account Settings
        </div>
        <p>
          Manage your account settings and preferences.
        </p>

        <div className="pt-4" />

        <div className="flex flex-col gap-1.5">
          <Label className="font-medium text-sm">
            Username
          </Label>
          <Input
            type="text"
            placeholder="Enter your username"
          />
          <div className="flex justify-end">
            <Button>
              Update Nickname
            </Button>
          </div>
        </div>

      </div>

      <div
        onClick={() => props.setIsOpen(false)}
        className="p-2 rounded-full  text-muted hover:bg-hover clickable select-none">
        <X size={24} />
      </div>
    </div>
  )
}