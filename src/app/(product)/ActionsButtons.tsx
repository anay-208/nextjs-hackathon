"use client";

import { InsertJournalType } from "@/db/schema";

type ActionButtonsProps = object;

export default function ActionButtons({}: ActionButtonsProps) {
  const journalId = 3; // Replace with the actual journal ID you want to fetch

  return (
    <>
      <button
        onClick={async () => {
          const body = {
            author_id: 1,
            content: "New Journal Entry - " + Math.random(),
          } satisfies InsertJournalType;

          const response = await fetch("/api/journal", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
          });

          const data = await response.json();
          if (!response.ok) {
            console.error("Failed to create journal:", data.error);
            return;
          }
          console.log("Journal created successfully:", data);
        }}
      >
        Add
      </button>
      <button
        onClick={async () => {
          const response = await fetch("/api/journal", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });

          const data = await response.json();
          if (!response.ok) {
            console.error("Failed to fetch journals:", data.error);
            return;
          }
          console.log("Fetched journals successfully:", data);
        }}
      >
        Get all
      </button>
      <button
        onClick={async () => {
          const response = await fetch("/api/journal/" + journalId, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });

          const data = await response.json();
          if (!response.ok) {
            console.error("Failed to fetch journal:", data.error);
            return;
          }
          console.log("Fetched journal successfully:", data);
        }}
      >
        Fetch single
      </button>
      <button
        onClick={async () => {
          const body = {
            content: "Updated Journal Entry - " + Math.random(),
          }; // Author id not needed (read in backend)

          const response = await fetch("/api/journal/" + journalId, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
          });

          if (!response.ok) {
            const data = await response.json();
            console.error("Failed to update journal:", data.error);
            return;
          }

          const text = await response.text();
          console.log("Journal updated successfully:", text);
        }}
      >
        Update single
      </button>
      <button
        onClick={async () => {
          const response = await fetch("/api/journal/" + journalId, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          });

          const text = await response.text();

          if (!response.ok) {
            console.error("Failed to delete journal:", text);
            return;
          }

          console.log("Journal deleted successfully:", text);
        }}
      >
        Delete single
      </button>
    </>
  );
}
