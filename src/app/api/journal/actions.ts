"use server";

import { adjectives, animals, colors, uniqueNamesGenerator } from "unique-names-generator";
import { handle, withAuth } from "../utils";
import {
  dbCreateJournal,
  dbDeleteJournal,
  dbGenerateSummary,
  dbGetJournal,
  dbGetJournalCount,
  dbListJournals,
  dbUpdateJournal,
  dbUpdateJournalTags,
} from "./db";
import {
  CreateJournalInput,
  ListJournalFilter,
  ListJournalSort,
} from "./types";

export const createJournal = async (data: Omit<CreateJournalInput, 'title'> & { title?: string }) =>
  handle(
    () =>
      withAuth(async (user) => {
        const generatedTitle = uniqueNamesGenerator({
          dictionaries: [adjectives, colors, animals],
          separator: "-",
          style: "lowerCase",
        });
        return await dbCreateJournal({ ...data, author_id: user.user.id, title: data.title ?? generatedTitle })
      }),
    "createJournal",
  );

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
      withAuth(async (user) => {
        return dbListJournals({
          author_id: user.user.id,
          page,
          pageSize,
          filter,
          sort: sort ?? { created_at: "desc" },
        })
      },
      ),
    "listJournals",
  );
export type GetListJournalResponse = Awaited<ReturnType<typeof listJournals>>;

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

export const updateJournalTags = async (id: string, tags: string[]) =>
  handle(
    () => withAuth((user) => dbUpdateJournalTags(id, tags, user.user.id)),
    "updateJournalTags",
  );

export const generateSummary = async (text: string) => {
  return handle(
    () => withAuth(() => dbGenerateSummary(text)),
    "generateSummary",
  );
};
