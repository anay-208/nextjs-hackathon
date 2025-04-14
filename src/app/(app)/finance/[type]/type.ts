export const validPageTypes = ["expense", "income"] as const;

export type PageType = (typeof validPageTypes)[number];

export const isValidPageType = (value: any): value is PageType => {
  return validPageTypes.includes(value);
};

export const toReadablePageType = (type: PageType) => {
  switch (type) {
    case "expense":
      return "Expenses";
    case "income":
      return "Income";
    default:
      return "Expenses";
  }
};
