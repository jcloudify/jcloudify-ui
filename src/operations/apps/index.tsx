import {Operation} from "../types";
import {AppList} from "./AppList";
import {AppShowLayout} from "./AppShowLayout";

export const apps: Operation = {
  name: "applications",
  list: AppList,
  show: AppShowLayout,
};

export * from "./AppList";
export * from "./AppShowLayout";
