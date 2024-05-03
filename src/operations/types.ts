import {ResourceProps} from "react-admin";

export type Operation = Pick<
  ResourceProps,
  "list" | "create" | "edit" | "show" | "icon" | "options" | "name"
>;
