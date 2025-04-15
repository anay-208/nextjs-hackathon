import { Time, validTimes } from "./time";
import { TimeDropdown } from "./time.client";
export async function TimeSelector(props: { time: Promise<Time> }) {
  const time = await props.time;
  const otherTimes = validTimes.filter((t) => t !== time);
  return (
    <div className="h-fit w-fit py-3">
      <TimeDropdown currentTime={time} otherTimes={otherTimes} />
    </div>
  );
}
