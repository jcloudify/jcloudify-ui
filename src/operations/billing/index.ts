import {Payment as PaymentIcon} from "@mui/icons-material";
import {Operation} from "@/operations/types";
import {Payments} from "./Payments";

export const billing: Operation = {
  name: "billing",
  list: Payments,
  icon: PaymentIcon,
  options: {label: "Billing"},
};

export * from "./Payments";

export * from "./Billing";
export * from "./ShowBillingInfo";
export * from "./BillingInformation";
