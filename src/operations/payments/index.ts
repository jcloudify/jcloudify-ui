import {Payment as PaymentIcon} from "@mui/icons-material";
import {Operation} from "../types";
import {Payments} from "./Payments";

export const billing: Operation = {
  name: "billing",
  list: Payments,
  icon: PaymentIcon,
};

export * from "./Payments";
