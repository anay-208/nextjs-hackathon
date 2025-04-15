import { Button } from "@/components/ui/button";
import type { ComponentProps, SVGProps } from "react";
import Link from "next/link";
import { MaterialSymbolsBook2 } from "../sidebar";
import { AppContent, PageLocation, PageTitle } from "../content-layouts";
import { serverAuth } from "@/auth/actions";
import { listJournals } from "@/app/api/journal/actions";
import { route } from "@/app/routes";

export default function Page() {


  return <AppContent>

    <PageLocation>Home</PageLocation>
    <PageTitle>Welcome back, Arinji</PageTitle>

    <div className="pt-12 grid grid-cols-1 md:grid-cols-2 gap-3">
      <Card>
        <div className="">
          <CardTitle>
            <MaterialSymbolsBook2 className="size-5" />
            <h2>My Journals</h2>
          </CardTitle>
        </div>
        <div className="flex flex-col mt-1 text-[0.9rem] font-medium border border-border rounded-xl p-1 mt-4 grow">
          <RecentJournals />
        </div>
        <Button className="mt-4" asChild>
          <Link href={"/dashboard/journal"}>
            View All Journals
          </Link>
        </Button>

      </Card>

      <Card>
        <div>
          <CardTitle>
            <MaterialSymbolsLocalFireDepartmentRounded className="size-5" />
            <h2>Streaks</h2>
          </CardTitle>
        </div>

        <div className="pt-4">
          <div className="text-5xl font-bold">
            948
          </div>
          <div>day streak!</div>
        </div>

        <div className="mt-4 bg-main-4/5 flex justify-between gap-1 text-sm p-4 rounded-md items-center">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, index) => (
            <div key={index} className="mb-1 grow flex flex-col gap-1 items-center font-semibold flex-1">
              <div className="text-muted">
                {day}
              </div>
              <div className="w-full flex justify-center py-2 bg-amber-500 rounded-md">
                <MaterialSymbolsLocalFireDepartmentRounded className="size-5 text-white" />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>

  </AppContent>

}

async function RecentJournals() {
  await serverAuth.protectedPage('/dashboard');

  const journals = await listJournals({
    sort: { created_at: "desc" },
    pageSize: 3,
  })

  if (!journals.data) {
    return <div className="text-muted">No journals found</div>
  }

  if (journals.error) {
    return <div className="text-destroy">Error fetching journals</div>
  }

  return <>
    {journals.data.map((j) => {
      return <Link key={j.id} href={route.journalID(j.id)} className="flex gap-2 items-center p-2 rounded-lg hover:bg-hover">
        <MaterialSymbolsAsterisk className="size-4.5 text-main-4/90" />
        <div>
          {j.title || <span className="text-muted">Untitled Entry</span>}
        </div>
      </Link>
    })}
  </>

}

function MaterialSymbolsLocalFireDepartmentRounded(props: SVGProps<SVGSVGElement>) {
  return (<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>{/* Icon from Material Symbols by Google - https://github.com/google/material-design-icons/blob/master/LICENSE */}<path fill="currentColor" d="M7.9 20.875q-1.75-1.05-2.825-2.863Q4 16.2 4 14q0-2.825 1.675-5.425q1.675-2.6 4.6-4.55q.55-.375 1.138-.038Q12 4.325 12 5v1.3q0 .85.588 1.425q.587.575 1.437.575q.425 0 .813-.187q.387-.188.687-.538q.2-.25.513-.313q.312-.062.587.138Q18.2 8.525 19.1 10.275q.9 1.75.9 3.725q0 2.2-1.075 4.012q-1.075 1.813-2.825 2.863q.425-.6.663-1.313Q17 18.85 17 18.05q0-1-.375-1.887q-.375-.888-1.075-1.588L12 11.1l-3.525 3.475q-.725.725-1.1 1.6Q7 17.05 7 18.05q0 .8.238 1.512q.237.713.662 1.313ZM12 21q-1.25 0-2.125-.863Q9 19.275 9 18.05q0-.575.225-1.112q.225-.538.65-.963L12 13.9l2.125 2.075q.425.425.65.95q.225.525.225 1.125q0 1.225-.875 2.087Q13.25 21 12 21Z"></path></svg>)
}
function MaterialSymbolsAsterisk(props: SVGProps<SVGSVGElement>) {
  return (<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>{/* Icon from Material Symbols by Google - https://github.com/google/material-design-icons/blob/master/LICENSE */}<path fill="currentColor" d="M11 21v-6.6l-4.65 4.675l-1.425-1.425L9.6 13H3v-2h6.6L4.925 6.35L6.35 4.925L11 9.6V3h2v6.6l4.65-4.675l1.425 1.425L14.4 11H21v2h-6.6l4.675 4.65l-1.425 1.425L13 14.4V21z"></path></svg>)
}

function Card(props: ComponentProps<"div">) {
  return (
    <div className="rounded-lg border border-border shadow-sm p-6 flex flex-col">
      {props.children}
    </div>
  )
}
function CardTitle(props: ComponentProps<"div">) {
  return (
    <div className="flex gap-1 items-center font-semibold text-lg">
      {props.children}
    </div>
  )
}
