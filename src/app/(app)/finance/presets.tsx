import { getTransactionsByTimeRange } from "@/app/api/finance/actions";
import { PresetsClient } from "./presets.client";
import { getTimeRange } from "./time";

export default async function Presets() {
  //  const presets = getAllPresets(); // TODO: Add this once backend is ready
  const timeRange = getTimeRange("today");
  const rawPresets = await getTransactionsByTimeRange(timeRange, {
    type: "expense",
  }); //TODO: Remove this once backend is ready
  const presets = rawPresets.data ?? [];
  return <PresetsClient presets={presets} />;
}
