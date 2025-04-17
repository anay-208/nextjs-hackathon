"use server";

import { handle, withAuth } from "../utils";
import { dbGetUserStreakData } from "./db";

export const getStreak = async (lastXDays?: number) =>
  handle(
    () =>
      withAuth(async ({ user }) => {
        return dbGetUserStreakData(user.id, lastXDays || 7);
      }),
    "getStreak",
  );
