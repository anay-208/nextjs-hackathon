import { getTransactionPresets } from "@/app/api/finance/actions";
import { PresetsClient } from "./presets.client";

export default async function Presets() {
  const presets = await getTransactionPresets();
  if (!presets.data) return null;
  return <PresetsClient presets={presets.data} />;
}
