"use server";

import { handle, withAuth } from "../utils";
import {
  dbCreateJournal,
  dbDeleteJournal,
  dbGetJournal,
  dbGetJournalCount,
  dbListJournals,
  dbUpdateJournal,
} from "./db";
import { CreateJournalInput } from "./types";

export const listJournals = async ({
  page = 0,
  pageSize = 10,
}: {
  page?: number;
  pageSize?: number;
}) =>
  handle(
    () =>
      withAuth((user) =>
        dbListJournals({ author_id: user.user.id, page, pageSize }),
      ),
    "listJournals",
  );

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
  handle(() => withAuth(() => dbGetJournal(id)), "getJournal");

export const deleteJournal = async (id: string) =>
  handle(() => withAuth(() => dbDeleteJournal(id)), "deleteJournal");

export const updateJournal = async (
  id: string,
  data: Partial<CreateJournalInput>,
) => handle(() => withAuth(() => dbUpdateJournal(id, data)), "updateJournal");
