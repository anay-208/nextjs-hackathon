

import Link from "next/link";
import { ArrowLeft, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Suspense, type ComponentProps } from "react";
import { SidebarItemList } from "./sidebar.cached";



export function Sidebar() {
  return (
    <div>
      <div className="mb-4 flex flex-col gap-1 pt-2">
        <Link href="/journal">
          <SidebarItemBase className="clickable">
            <ArrowLeft className="size-4" />
            Back
          </SidebarItemBase>
        </Link>
        <SidebarItemBase className="bg-primary text-white/90 hover:bg-primary/90 clickable">
          <Plus className="size-4" />
          New Entry
        </SidebarItemBase>
      </div>

      <div>
        <Suspense>
          <SidebarItemList />
        </Suspense>
      </div>
    </div>
  );
}





export function SidebarItemBase(props: ComponentProps<"div"> & {
  'data-active'?: boolean
}) {
  return (<div {...props} className={cn(
    "group",
    "-mx-1",
    "relative",
    'group flex h-fit flex-row items-center justify-start gap-2 rounded-sm p-1.5 px-3',
    'text-sm font-semibold text-main-2/75 text-nowrap text-ellipsis',
    props['data-active'] ? "bg-main-3/18 text-fg" : "hover:bg-hover",
    props.className
  )} />)
}





// export function SidebarSkeleton() {
//   return (
//     <div className="h-full w-full space-y-4">
//       <div className="flex h-fit w-full flex-row items-start justify-start gap-2">
//         <PlusCircle className="text-muted-foreground size-6" />
//         <Skeleton className="h-4 w-24" />
//       </div>

//       {Array.from({ length: 3 }).map((_, i) => (
//         <div key={i} className="space-y-1">
//           <Skeleton className="h-4 w-20" />

//           <ul className="flex flex-col items-start justify-start space-y-1">
//             {Array.from({ length: 3 }).map((_, j) => (
//               <div
//                 key={j}
//                 className="flex h-fit w-full flex-row items-center justify-start gap-2 rounded-sm p-1"
//               >
//                 <Skeleton className="h-4 w-full flex-1" />
//                 <Skeleton className="size-4 shrink-0" />
//               </div>
//             ))}
//           </ul>
//         </div>
//       ))}
//     </div>
//   );
// }
