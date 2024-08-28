export interface TodoPayment {
  id: string;
  description: string;
  date: Date;
  amount: number;
  currency: string;
  status: string;
}

export const paymentsMock: TodoPayment[] = [
  {
    id: "payment-0",
    description:
      "Lorem occaecat pariatur ipsum qui reprehenderit enim proident velit ut labore labore anim non laboris.",
    date: new Date("2024/08/01"),
    amount: 1500,
    currency: "usd",
    status: "requires_confirmation",
  },
  {
    id: "payment-1",
    description:
      "Aute fugiat velit aliquip elit tempor. Id est excepteur in duis nisi.",
    date: new Date("2024/07/01"),
    amount: 1260,
    currency: "usd",
    status: "succeeded",
  },
  {
    id: "payment-2",
    description:
      "Cupidatat occaecat id ullamco deserunt laboris qui enim dolor et dolore ex amet.",
    date: new Date("2024/06/01"),
    amount: 1452,
    currency: "usd",
    status: "processing",
  },
];
