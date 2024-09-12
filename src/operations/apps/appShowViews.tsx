import {
  AppEnvironmentCreate,
  AppEnvironmentCreation,
  AppEnvironmentDiff,
  AppEnvironmentList,
  AppEnvironmentShow,
} from "./AppEnvironment";
import {RouteMap} from "@/components/router";
import {AppDeploymentList, AppDeploymentShow} from "./AppDeployment";

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
    ":deploymentId": <AppDeploymentShow />,
  },
};
