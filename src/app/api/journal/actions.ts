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

export const listJournals = ({
  author_id,
  page = 0,
  pageSize = 10,
}: {
  author_id: number;
  page?: number;
  pageSize?: number;
}) =>
  handle(
    () => withAuth(() => dbListJournals({ author_id, page, pageSize })),
    "listJournals",
  );

export const createJournal = (data: CreateJournalInput) =>
  handle(
    () =>
      withAuth((user) => dbCreateJournal({ ...data, author_id: user.user.id })),
    "createJournal",
  );

export const getJournalCount = () =>
  handle(
    () => withAuth((user) => dbGetJournalCount(user.user.id)),
    "getJournalCount",
  );

export const getJournal = (id: number) =>
  handle(() => withAuth(() => dbGetJournal(id)), "getJournal");

export const deleteJournal = (id: number) =>
  handle(() => withAuth(() => dbDeleteJournal(id)), "deleteJournal");

export const updateJournal = (id: number, data: Partial<CreateJournalInput>) =>
  handle(() => withAuth(() => dbUpdateJournal(id, data)), "updateJournal");
