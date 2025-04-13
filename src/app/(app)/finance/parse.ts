export function parseInput(
  input: string,
): { label: string; amount: number; type: "income" | "expense" } | null {
  const parts = input.trim().split(" ");
  if (parts.length < 2) return null;

  const rawAmount = parts.pop()!;
  const label = parts.join(" ");

  const match = rawAmount.match(/^([+-])(\d+)([a-z]*)/i);
  if (!match) return null;

  const [, sign, numStr, suffix] = match;
  const number = parseInt(numStr, 10);
  if (isNaN(number)) return null;

  const multipliers: Record<string, number> = {
    "": 1,
    h: 100,
    k: 1_000,
    hk: 100_000,
    m: 1_000_000,
    hm: 100_000,
  };

  const mul = multipliers[suffix.toLowerCase()];
  if (mul === undefined) return null;

  return {
    label,
    amount: number * mul,
    type: sign === "+" ? "income" : "expense",
  };
}
