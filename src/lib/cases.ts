export type CaseSize = 4 | 6 | 8 | 12;

export interface CaseOption {
  size: CaseSize;
  price: number;
  label: string;
  note?: string;
}

/** Build-your-own case sizes. Bulk still feels smarter. */
export const CASE_OPTIONS: CaseOption[] = [
  { size: 4, price: 6.49, label: "4 cans" },
  { size: 6, price: 9.49, label: "6 cans" },
  { size: 8, price: 12.49, label: "8 cans", note: "Solid" },
  { size: 12, price: 17.99, label: "12 cans", note: "Best deal" },
];

export function caseOption(size: CaseSize): CaseOption {
  return CASE_OPTIONS.find((c) => c.size === size)!;
}

export function perCan(size: CaseSize): number {
  const c = caseOption(size);
  return c.price / c.size;
}
