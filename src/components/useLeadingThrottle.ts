import { useRef, useState } from "react";

export function useLeadingThrottle<I extends any[]>(durationMs: number, call: (...args: I) => void) {
  const leadingFirstThrottleRef = useRef<NodeJS.Timeout>(null);
  const latestInputRef = useRef<I>(null);

  const [isThrottling, setIsThrottling] = useState(false);

  const dispatch = (...args: I) => {
    setIsThrottling(true);
    latestInputRef.current = args;
    if (leadingFirstThrottleRef.current) {
      return;
    }
    leadingFirstThrottleRef.current = setTimeout(() => {
      call(...latestInputRef.current as I);
      leadingFirstThrottleRef.current = null;
      setIsThrottling(false)
    }, durationMs);
  }

  return [isThrottling, dispatch] as const
}