import {Operation} from "../types";
import {AppList} from "./AppList";

export const apps: Operation = {
  name: "applications",
  list: AppList,
};

export * from "./AppList";
export * from "./AppShowLayout";
export * from "./appShowViews";
export * from "./appCreateViews";
