export interface Plan {
  id: string;
  name: string;
  cost: number;
  details: string[];
  description: string;
}

export const planList: Plan[] = [
  {
    id: "plan_0",
    name: "Hobby",
    description: "For solo entrepreneurs",
    cost: 0,
    details: [
      "Up to 45% shipping discount",
      "10 Inventory locations",
      "24/7 chat support",
      "Localized global selling (3 markets)",
      "POS Lite",
    ],
  },
  {
    id: "plan_1",
    name: "Pro",
    description: "For solo entrepreneurs",
    cost: 15,
    details: [
      "Up to 45% shipping discount",
      "10 Inventory locations",
      "24/7 chat support",
      "Localized global selling (3 markets)",
      "POS Lite",
    ],
  },
];
