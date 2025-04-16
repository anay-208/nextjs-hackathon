"use server";

import { handle, withAuth } from "../utils";
import { dbGetGoals, dbGetGoal, dbCreateGoal, dbMarkGoalAsComplete } from "./db";

export const createGoal = async (title: string, deadline: Date) =>
  handle(
    () =>
      withAuth(({ user }) =>
        dbCreateGoal(user.id, title, deadline),
      ),
    "createGoal",
  );

export const getGoals = async () =>
  handle(
    () => withAuth(({ user }) => dbGetGoals(user.id)),
    "getGoals",
  );
  
export const getGoal = async (goalId: string) =>
  handle(
    () => withAuth(({ user }) => dbGetGoal(user.id, goalId)),
    "getGoal",
  );

export const toggleGoalCompletion = async (goalId: string, completed: boolean) =>
  handle(
    () => withAuth(({ user }) => dbMarkGoalAsComplete(user.id, goalId, completed)),
    "toggleGoalCompletion",
  );