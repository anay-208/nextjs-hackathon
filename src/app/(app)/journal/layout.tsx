import { JournalSidebarClient } from "./sidebar.client";

export default function Layout(props: {
  children: React.ReactNode;
  sidebar?: React.ReactNode;
}) {
  return (
    <div className="bg-main-4/13 -m-(--p) flex min-h-0 grow">
      <JournalSidebarClient>{props.sidebar}</JournalSidebarClient>
      <div className="z-10 flex min-h-0 grow flex-col overflow-auto rounded-lg bg-white p-(--p)">
        {props.children}
      </div>
    </div>
  );
}

