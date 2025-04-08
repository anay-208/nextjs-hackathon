import { getJournalCount } from "../crud";

export async function GET() {
  const author_id = 1; // Replace with actual author ID from session or request context when its ready
  return getJournalCount(author_id);
}
