import Icon from "@/assets/icon.png";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { generateSummary } from "../api/journal/actions";

export default async function Home() {
  const result = await generateSummary(`Tuesday, October 24th

Another day gone. I swear, sometimes I feel like I'm just watching the hours tick by, like I'm a spectator in my own life. It's not that anything bad is happening, exactly. It's more like… a dull ache, a kind of quiet restlessness. I keep wondering if this is it. If this is what "adulting" is supposed to feel like.

I spent most of the afternoon trying to sort through that pile of papers on my desk. You know, the one I've been avoiding for weeks. Bills, random notes, that half-finished to-do list that just mocks me every time I look at it. I managed to get through maybe a third of it before I just gave up. My brain felt like it was turning to mush. I wish I had that kind of focus people talk about, the ability to just power through things. I always feel like I'm fighting against some invisible resistance.

I did manage to take a walk in the park this evening. The leaves are finally starting to turn, which is beautiful, but also kind of sad. It's like watching something slowly fade away. It made me think about how quickly time passes, and how I don't want to waste it. I keep telling myself I'm going to start that painting project, or learn that new language, or finally get around to reading all those books stacked on my nightstand. But then, the day just… slips away.

I had dinner with Sarah tonight. We talked about her new job, which sounds incredibly stressful, but she seems to be handling it well. She always has her stuff together. I envy that. I told her about my general sense of… blah, and she just nodded and said, "Yeah, that's life." I guess she's right. But that doesn't make it feel any less… blah.

I'm trying to figure out what I want, or what I need. Is it a change of scenery? A new hobby? A different job? I don't know. I just feel like I'm floating, untethered.

I keep thinking about that quote, "The unexamined life is not worth living." I'm trying to examine, I really am. But it's like trying to see through fog. I just wish I could see the path a little clearer.

Maybe tomorrow will be better. Maybe I'll wake up with some kind of epiphany. Or maybe I'll just have another cup of coffee and try to tackle that pile of papers again. Either way, I'm going to try to be a little kinder to myself. It's exhausting being your own critic all the time.

Okay, enough for tonight. Time to try and get some sleep. Maybe I'll dream of clearer paths and less foggy days.

Goodnight, journal.`);

  console.log("result", result);

  return (
    <div
      className="min-h-[100svh] w-full"
      style={{
        "--max-w": "1080px",
        "--px": "1rem",
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
          <div className="flex gap-2 py-20">
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
            <div className="h-80 w-full grow rounded-lg bg-zinc-100">
              {/* Insert Illustration #1 */}
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
