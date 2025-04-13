"use server";

import { faker } from "@faker-js/faker";
import { handle, withAuth } from "../utils";
import {
  dbAttachTagToJournal,
  dbCreateJournal,
  dbCreateJournalTag,
  dbDeleteJournal,
  dbDeleteJournalTag,
  dbDetachTagFromJournal,
  dbGenerateSummary,
  dbGetJournal,
  dbGetJournalCount,
  dbListJournals,
  dbUpdateJournal,
  dbUpdateJournalTag,
} from "./db";
import {
  CreateJournalInput,
  CreateJournalTagInput,
  ListJournalFilter,
  ListJournalSort,
} from "./types";

export const createJournal = async (
  data: CreateJournalInput,
) =>
  handle(
    () =>
      withAuth(async ({user}) => {
        const generatedTitle = faker.word.words(3);
        return await dbCreateJournal({
          ...data,
          user_id: user.id,
          title: data.title ?? generatedTitle,
        });
      }),
    "createJournal",
  );

export const listJournals = async ({
  filter,
  sort = { created_at: "desc" },
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
      withAuth(async ({ user }) => {
        return dbListJournals({
          user_id: user.id,
          page,
          pageSize,
          filter,
          sort,
        });
      }),
    "listJournals",
  );
export type GetListJournalResponse = Awaited<ReturnType<typeof listJournals>>;

export const getJournalCount = async () =>
  handle(
    () => withAuth(({ user }) => dbGetJournalCount(user.id)),
    "getJournalCount",
  );

export const getJournal = async (id: string) =>
  handle(() => withAuth(({ user }) => dbGetJournal(id, user.id)), "getJournal");

export const deleteJournal = async (id: string) =>
  handle(
    () =>
      withAuth(async ({ user }) => {
        const res = await dbDeleteJournal(id, user.id);
        return res;
      }),
    "deleteJournal",
  );

export const updateJournal = async (
  id: string,
  data: Partial<CreateJournalInput>,
) =>
  handle(
    () => withAuth(({ user }) => dbUpdateJournal(id, data, user.id)),
    "updateJournal",
  );

export const generateSummary = async (text: string) => {
  return handle(
    () => withAuth(() => dbGenerateSummary(text)),
    "generateSummary",
  );
};

export const createJournalTag = async (data: CreateJournalTagInput) => {
  return handle(
    () =>
      withAuth(async ({ user }) => {
        return await dbCreateJournalTag(user.id, data);
      }),
    "createJournalTag",
  );
};

export const deleteJournalTag = async (id: string) => {
  return handle(
    () =>
      withAuth(async ({ user }) => {
        return await dbDeleteJournalTag(user.id, id);
      }),
    "deleteJournalTag",
  );
};

export const updateJournalTag = async (
  id: string,
  data: Partial<CreateJournalTagInput>,
) => {
  return handle(
    () =>
      withAuth(async ({ user }) => {
        return await dbUpdateJournalTag(user.id, id, data);
      }),
    "updateJournalTag",
  );
};

export const attachTagToJournal = async (journalId: string, tagId: string) => {
  return handle(
    () =>
      withAuth(async ({ user }) => {
        return await dbAttachTagToJournal(user.id, journalId, tagId);
      }),
    "attachTagToJournal",
  );
};

export const detachTagFromJournal = async (
  journalId: string,
  tagId: string,
) => {
  return handle(
    () =>
      withAuth(async ({ user }) => {
        return await dbDetachTagFromJournal(user.id, journalId, tagId);
      }),
    "detachTagFromJournal",
  );
};
