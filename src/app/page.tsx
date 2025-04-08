import Image from "next/image"
import Icon from "@/assets/icon.png"
import { Button } from "@/components/ui/button"

export default async function Home() {
  return (
    <div className="flex min-h-[100svh] w-full"
      style={{
        '--max-w': '1080px',
      }}
    >
      <header className="w-full mx-auto h-12 flex justify-center sticky top-0">
        <div className="max-w-(--max-w) grow px-4 flex justify-between items-center">
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

      </main>
      <footer>

      </footer>
    </div>
  );
}
