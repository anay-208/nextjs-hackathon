"use server";

import { revalidatePath } from "next/cache";
import { handle, withAuth } from "../utils";
import {
  dbCreateJournal,
  dbDeleteJournal,
  dbGetJournal,
  dbGetJournalCount,
  dbListJournals,
  dbUpdateJournal,
} from "./db";
import {
  CreateJournalInput,
  ListJournalFilter,
  ListJournalSort,
} from "./types";

export const listJournals = async ({
  filter,
  sort,
  page = 0,
  pageSize = 10,
}: {
  page?: number;
  pageSize?: number;
  filter?: ListJournalFilter;
  sort?: ListJournalSort;
}) =>
  handle(
    () =>
      withAuth((user) =>
        dbListJournals({
          author_id: user.user.id,
          page,
          pageSize,
          filter,
          sort: sort ?? { created_at: "desc" },
        }),
      ),
    "listJournals",
  );
export type GetListJournalResponse = Awaited<ReturnType<typeof listJournals>>;

export const createJournal = async (data: CreateJournalInput) =>
  handle(
    () =>
      withAuth((user) => dbCreateJournal({ ...data, author_id: user.user.id })),
    "createJournal",
  );

export const getJournalCount = async () =>
  handle(
    () => withAuth((user) => dbGetJournalCount(user.user.id)),
    "getJournalCount",
  );

export const getJournal = async (id: string) =>
  handle(
    () => withAuth((user) => dbGetJournal(id, user.user.id)),
    "getJournal",
  );

export const deleteJournal = async (id: string) =>
  handle(
    () =>
      withAuth(async (user) => {
        const res = await dbDeleteJournal(id, user.user.id);
        revalidatePath("/journal");
        return res;
      }),
    "deleteJournal",
  );

export const updateJournal = async (
  id: string,
  data: Partial<CreateJournalInput>,
) =>
  handle(
    () => withAuth((user) => dbUpdateJournal(id, data, user.user.id)),
    "updateJournal",
  );
