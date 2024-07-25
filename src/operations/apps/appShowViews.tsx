import {
  AppEnvironmentCreate,
  AppEnvironmentCreation,
  AppEnvironmentDiff,
  AppEnvironmentList,
  AppEnvironmentShow,
} from "./AppEnvironment";
import {
  AppDeploymentList,
  AppDeploymentShow,
  AppDeploymentStackList,
} from "./AppDeployment";
import {AppLogList, AppLogShow} from "./AppLogs";
import {AppMonitoring} from "./AppMonitoring";
import {RouteMap} from "@/components/router";

export const appShowViews: RouteMap = {
  environments: {
    "$$index": <AppEnvironmentList />,
    ":envId": <AppEnvironmentShow />,
    "creation-template": <AppEnvironmentCreation />,
    "create": <AppEnvironmentCreate />,
    "diff": <AppEnvironmentDiff />,
  },
  deployments: {
    "$$index": <AppDeploymentList />,
    ":deplId": <AppDeploymentShow />,
    "stacks": <AppDeploymentStackList />,
    "stacks/:stackId": <h1>stack id</h1>,
  },
  monitoring: <AppMonitoring />,
  logs: {
    "$$index": <AppLogList />,
    ":logId": <AppLogShow />,
  },
};
