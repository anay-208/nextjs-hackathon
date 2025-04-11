import { JournalSidebarClient } from "./sidebar.client";

export default function Layout(props: {
  children: React.ReactNode,
  sidebar?: React.ReactNode,
}) {
  return (
    <div className="grow -m-(--p)  flex bg-main-4/13">
      <JournalSidebarClient>
        {props.sidebar}
      </JournalSidebarClient>
      <div className="grow bg-white p-(--p) rounded-lg">
        {props.children}
      </div>
    </div>
  );
}