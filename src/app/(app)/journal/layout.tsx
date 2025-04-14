import { JournalSidebarClient } from "./sidebar.client";

export default function Layout(props: {
  children: React.ReactNode,
  sidebar?: React.ReactNode,
}) {
  return (
    <div className="grow -m-(--p)  flex bg-main-4/13 min-h-0">
      <JournalSidebarClient>
        {props.sidebar}
      </JournalSidebarClient>
      <div className="grow bg-white p-(--p) rounded-lg overflow-auto flex flex-col min-h-0">
        {props.children}
      </div>
    </div>
  );
}