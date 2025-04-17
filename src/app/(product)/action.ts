"use server";

import { getStreak } from "@/actions/streak/actions";

export const callMeMaybe = async () => {
  const data = await getStreak();
  console.log(
    "data",
    data,
    data.data?.streakItems,
    data.data?.streakItems[0].entries,
  );
};
