import {AppEnvironment} from "./AppEnvironment";
import {AppDeploymentList, AppDeploymentShow} from "./AppDeployment";
import {AppLogList, AppLogShow} from "./AppLogs";
import {AppMonitoring} from "./AppMonitoring";
import {AppMetadata} from "./AppMetadata";
import {RouteMap} from "@/components/router";

export const appShowViews: RouteMap = {
  environments: <AppEnvironment />,
  deployments: {
    "$$index": <AppDeploymentList />,
    ":deplId": <AppDeploymentShow />,
  },
  monitoring: <AppMonitoring />,
  logs: {
    "$$index": <AppLogList />,
    ":logId": <AppLogShow />,
  },
  metadata: <AppMetadata />,
};
