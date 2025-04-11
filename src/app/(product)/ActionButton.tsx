"use client";

import { Button } from "@/components/ui/button";
import { generateSummary } from "../api/journal/actions";

type ActionButtonsProps = {};

export default function ActionButtons({}: ActionButtonsProps) {
  const summarize = async () => {
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

    console.log("result: ", result);
  };

  return (
    <>
      <h1>ActionButtons</h1>
      <Button onClick={summarize}>Summarize</Button>
    </>
  );
}
