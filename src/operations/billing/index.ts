import {Payment as PaymentIcon} from "@mui/icons-material";
import {Operation} from "@/operations/types";
import {Billing} from "./Billing";

export const billing: Operation = {
  name: "billing",
  list: Billing,
  icon: PaymentIcon,
  options: {label: "Billing"},
};

export * from "../payments/Payments";

export * from "./Billing";
export * from "./ShowBillingInfo";
