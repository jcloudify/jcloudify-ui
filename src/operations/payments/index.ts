import {Operation} from "../types";
import {Payments} from "./Payments";

export const billing: Operation = {
  name: "billing",
  list: Payments,
};

export * from "./Payments";
