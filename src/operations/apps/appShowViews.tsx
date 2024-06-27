import {AppEnvironment} from "./AppEnvironment";
import {AppDeploymentList, AppDeploymentShow} from "./AppDeployment";
import {AppLogList, AppLogShow} from "./AppLogs";
import {RouteMap} from "@/components/router";

export const appShowViews: RouteMap = {
  environments: <AppEnvironment />,
  deployments: {
    "$$index": <AppDeploymentList />,
    ":deplId": <AppDeploymentShow />,
  },
  analytics: <h1>analytics</h1>,
  logs: {
    "$$index": <AppLogList />,
    ":logId": <AppLogShow />,
  },
};
