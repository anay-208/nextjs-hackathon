import Image from "next/image"
import Icon from "@/assets/icon.png"
import { Button } from "@/components/ui/button"

export default async function Home() {
  return (
    <div className="min-h-[100svh] w-full"
      style={{
        '--max-w': '1080px',
        '--px': '1rem',
      }}
    >
      <header className="w-full mx-auto h-12 flex justify-center sticky top-0 border-b bg-background">
        <div className="max-w-(--max-w) px-(--px) grow flex justify-between items-center">
          <div className="flex items-center gap-1">
            <Image src={Icon} alt={"Lifelog Icon"} width={28} height={28} />
            <div className="font-semibold tracking-tight">
              Lifelog
            </div>
          </div>

          <div className="flex items-center gap-3 text-sm tracking-tight font-medium">
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
        <section className="max-w-(--max-w) px-(--px) mx-auto">
          <div className="flex py-20 gap-2">
            <div className="flex flex-col gap-8">
              <h1 className="text-6xl font-semibold tracking-tighter text-pretty">
                Your Personal Operating System for Real Life
              </h1>
              <div className="text-2xl tracking-tighter text-pretty font-medium">
                All your thoughts, goals, finances, and reflections — in one secure, cozy space.
              </div>
              <div className="flex gap-2">
                <Button className="text-base h-10 px-5">
                  Get started now →
                </Button>
                <Button className="text-base h-10 px-5" variant="secondary">
                  Learn More
                </Button>
              </div>
            </div>
            <div className="grow w-full h-80 bg-zinc-100 rounded-lg">
              {/* Insert Illustration #1 */}
            </div>
          </div>
          <div className="h-160 bg-zinc-100 rounded-lg">
            <div className="p-3 flex gap-2">
              <div className="size-3 bg-zinc-200 rounded-full"/>
              <div className="size-3 bg-zinc-200 rounded-full"/>
              <div className="size-3 bg-zinc-200 rounded-full"/>
            </div>
          </div>
        </section>


      </main>
      <footer className="h-[40svh] border-t mt-24">
        <div className="max-w-(--max-w) px-(--px) mx-auto w-full flex flex-col py-12 text-sm text-muted-foreground">

          <div className="flex items-center gap-1">
            <Image src={Icon} alt={"Lifelog Icon"} width={28} height={28} />
            <div className="font-semibold tracking-tight text-foreground">
              Lifelog
            </div>
          </div>

          <div className="flex gap-6 pt-4">
            <Button variant="link" className="px-0">About</Button>
            <Button variant="link" className="px-0">GitHub</Button>
            <Button variant="link" className="px-0">Contact</Button>
          </div>

          <div className="pt-12 flex gap-8">
            <div>© 2025 LifeLog</div>
            <div>Made for the Next.js 2025 Hackathon</div>
          </div>

        </div>
      </footer>
    </div>
  );
}
