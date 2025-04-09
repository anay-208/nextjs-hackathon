"use client";

import { Button } from "@/components/ui/button";
import {
  createJournal,
  deleteJournal,
  getJournal,
  getJournalCount,
  listJournals,
  updateJournal,
} from "../api/journal/actions";

type ActionButtonsProps = {};

export default function ActionButtons({}: ActionButtonsProps) {
  const journalId = "jorn_01JRE3GK8MMVEEAKEDDN8E9MPG";

  return (
    <>
      <Button
        onClick={async () => {
          const result = await createJournal({
            title: "This is a test - " + Math.random(),
          });

          console.log("result", result);
        }}
      >
        Add
      </Button>
      <Button
        onClick={async () => {
          const result = await listJournals({});
          console.log("All journals: ", result);
        }}
      >
        Get all
      </Button>
      <Button
        onClick={async () => {
          const result = await getJournal(journalId);
          console.log("Single journal: ", result);
        }}
      >
        Fetch single
      </Button>
      <Button
        onClick={async () => {
          const result = await updateJournal(journalId, {
            title: "Updated title - " + Math.random(),
          });
          console.log("Updated journal: ", result);
        }}
      >
        Update single
      </Button>
      <Button
        onClick={async () => {
          const result = await deleteJournal(journalId);
          console.log("Deleted journal: ", result);
        }}
      >
        Delete single
      </Button>
      <Button
        onClick={async () => {
          const result = await getJournalCount();
          console.log("Journal count: ", result);
        }}
      >
        Get Count
      </Button>
    </>
  );
}
