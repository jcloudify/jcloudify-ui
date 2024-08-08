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

export const planDetails = {
  hobby: {
    "Framework": "Spring Boot",
    "Compute and memory (Mo-day)": 1,
    "Compute frontal request": 10_000,
    "Compute Egress (Go)": 1,
    "Cold start p90 (s)": 8,
    "Cold start p80 (s)": 1,
    "DB Type": "SQlite",
    "EFS Storage (Go)": 0.1,
    "EFS Ingress and Egress (Go)": 10,
    "S3 Storage (Go)": 0.5,
    "S3 Egress Only (Go)": 5,
    "SQS Events": 10_000,
    "Email sender": "noreply@poja.com",
    "Email number": 500,
    "Email Egress (Go)": 1,
    "Github": "BYOG: GHA are free for public repo",
    "Shutting Down (SD) warning (month)": 1,
  },
  pro: {
    "Framework": "Spring Boot",
    "Compute and memory (Mo-day)": 2,
    "Compute frontal request": 110_000,
    "Compute Egress (Go)": 11,
    "Cold start p90 (s)": 1.2,
    "Cold start p80 (s)": 0.5,
    "DB Type": "BYO",
    "EFS Storage (Go)": "-",
    "EFS Ingress and Egress (Go)": "-",
    "S3 Storage (Go)": 1,
    "S3 Egress Only (Go)": 10,
    "SQS Events": 1_010_000,
    "Email sender": "noreply@poja.com",
    "Email number": 1_000,
    "Email Egress (Go)": 2,
    "Github": "BYOG: GHA are free for public repo",
    "Shutting Down (SD) warning (month)": "Never SD",
  },
};
