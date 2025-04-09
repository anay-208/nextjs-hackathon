import { Button } from "@/components/ui/button";
import { MaterialSymbolsBook2 } from "../sidebar.client";
import type { SVGProps } from "react";

export default function Page() {
  return <div className="-m-4">
    {/* Mini navbar */}
    <div className="p-4 flex leading-none text-[0.9rem]">
      Home
    </div>
    <div className="pt-20 flex flex-col max-w-[860px] mx-auto">
      <h1 className="text-3xl font-semibold tracking-tighter">Welcome back, Arinji</h1>
      <p className="pt-2 text-muted-foreground font-medium">Today is {new Date(Date.now()).toDateString()}</p>
      <div className="pt-12 grid grid-cols-2 gap-3">
        {/* Card 1 */}
        <div className="rounded-lg border border-border! p-6">
          <div>
            <div className="flex gap-1 items-center mb-1">
              <MaterialSymbolsBook2 className="size-5" />
              <h2 className="font-semibold">My Journals</h2>
            </div>
            <p className="text-[0.9rem] text-text!">You have 3 journals</p>
          </div>
          <hr  className="border-border! mt-4"/>
          {/* List of journals sorted by date */}
          <div className="flex flex-col pt-4 text-[0.9rem] font-medium">
            {
              [
                "Tue 8 April 2023",
                "Tue 9 April 2023",
                "Tue 10 April 2023",
              ].map((date, index) => (
                <div key={index} className="h-9 flex items-center clickable select-none -mx-2 px-2 hover:bg-accent rounded-lg">
                  {date}
                </div>
              ))
            }
          </div>
          <Button className="mt-4">
            View All Journals
          </Button>


        </div>

        {/* Card 2 */}
        <div className="rounded-lg border border-border! p-6 flex flex-col">
          <div>
            <div className="flex gap-1 items-center mb-1">
              <MaterialSymbolsLocalFireDepartmentRounded className="size-5" />
              <h2 className="font-semibold">Streaks</h2>
            </div>
          </div>
          <div className="pt-4">
            <div className="text-5xl font-semibold">
              948
            </div>
            <div>day streak!</div>
          </div>
          <div className="mt-4 bg-accent flex justify-between gap-1 text-sm p-4 rounded-md items-center">
            {
              ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, index) => (
                <div key={index} className="mb-1 grow flex flex-col gap-1 items-center font-semibold flex-1">
                  <div>
                    {day}
                  </div>
                  <div className="w-full flex justify-center py-2 bg-amber-500 rounded-md">
                    <MaterialSymbolsLocalFireDepartmentRounded className="size-5 text-white" />
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  </div>;
}



export function MaterialSymbolsLocalFireDepartmentRounded(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>{/* Icon from Material Symbols by Google - https://github.com/google/material-design-icons/blob/master/LICENSE */}<path fill="currentColor" d="M7.9 20.875q-1.75-1.05-2.825-2.863Q4 16.2 4 14q0-2.825 1.675-5.425q1.675-2.6 4.6-4.55q.55-.375 1.138-.038Q12 4.325 12 5v1.3q0 .85.588 1.425q.587.575 1.437.575q.425 0 .813-.187q.387-.188.687-.538q.2-.25.513-.313q.312-.062.587.138Q18.2 8.525 19.1 10.275q.9 1.75.9 3.725q0 2.2-1.075 4.012q-1.075 1.813-2.825 2.863q.425-.6.663-1.313Q17 18.85 17 18.05q0-1-.375-1.887q-.375-.888-1.075-1.588L12 11.1l-3.525 3.475q-.725.725-1.1 1.6Q7 17.05 7 18.05q0 .8.238 1.512q.237.713.662 1.313ZM12 21q-1.25 0-2.125-.863Q9 19.275 9 18.05q0-.575.225-1.112q.225-.538.65-.963L12 13.9l2.125 2.075q.425.425.65.95q.225.525.225 1.125q0 1.225-.875 2.087Q13.25 21 12 21Z"></path></svg>
  )
}