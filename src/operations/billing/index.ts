import {Payment as PaymentIcon} from "@mui/icons-material";
import {Operation} from "@/operations/types";
import {Billing} from "./Billing";

export const billing: Operation = {
  name: "billing",
  list: Billing,
  // TODO: custom Menu
  icon: PaymentIcon,
  options: {label: "Billing"},
};

export * from "./Billing";
export * from "./ShowBillingInfo";
export * from "./BillingShow";
