import Icon from "@/assets/icon.png";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Illustration1 } from "./illustration1";

export default async function Home() {
  return (
    <div
      className="min-h-[100svh] w-full"
      style={{
        "--max-w": "1080px",
        "--px": "2rem",
      }}
    >
      <header className="bg-bg border-border sticky top-0 mx-auto flex h-12 w-full justify-center border-b">
        <div className="flex max-w-(--max-w) grow items-center justify-between px-(--px)">
          <div className="flex items-center gap-1">
            <Image src={Icon} alt={"Lifelog Icon"} width={28} height={28} />
            <div className="font-semibold tracking-tight">Lifelog</div>
          </div>

          <div className="flex items-center gap-3 text-sm font-medium tracking-tight">
            <Button variant="ghost" className="h-8">
              Log in
            </Button>
            <Button variant="default" className="h-8">
              Get Started
            </Button>
          </div>
        </div>
      </header>

      <main>
        <section className="mx-auto max-w-(--max-w) px-(--px)">
          <div className="flex flex-col md:flex-row gap-2 gap-y-8 py-20">
            <div className="flex flex-col gap-8">
              <h1 className="text-6xl font-semibold tracking-tighter text-pretty">
                Your Personal Operating System for Real Life
              </h1>
              <div className="text-2xl font-medium tracking-tighter text-pretty">
                All your thoughts, goals, finances, and reflections — in one
                secure, cozy space.
              </div>
              <div className="flex gap-2">
                <Button className="h-10 px-5 text-base">
                  Get started now →
                </Button>
                <Button className="h-10 px-5 text-base" variant="secondary">
                  Learn More
                </Button>
              </div>
            </div>
            <div className="h-80 w-full grow rounded-lg flex items-center justify-center min-w-0">
              <Illustration1 className="h-[130%]" />
            </div>
          </div>
          <div className="h-160 rounded-lg bg-zinc-100">
            <div className="flex gap-2 p-3">
              <div className="size-3 rounded-full bg-zinc-200" />
              <div className="size-3 rounded-full bg-zinc-200" />
              <div className="size-3 rounded-full bg-zinc-200" />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-border mt-24 h-[40svh] border-t">
        <div className="text-muted-foreground mx-auto flex w-full max-w-(--max-w) flex-col px-(--px) py-12 text-sm">
          <div className="flex items-center gap-1">
            <Image src={Icon} alt={"Lifelog Icon"} width={28} height={28} />
            <div className="text-foreground font-semibold tracking-tight">
              Lifelog
            </div>
          </div>

          <div className="flex gap-6 pt-4">
            <Button variant="link" className="px-0">
              About
            </Button>
            <Button variant="link" className="px-0">
              GitHub
            </Button>
            <Button variant="link" className="px-0">
              Contact
            </Button>
          </div>

          <div className="flex gap-8 pt-12">
            <div>© 2025 LifeLog</div>
            <div>Made for the Next.js 2025 Hackathon</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
