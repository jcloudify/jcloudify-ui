import {
  AppEnvironmentCreate,
  AppEnvironmentCreation,
  AppEnvironmentDiff,
  AppEnvironmentShow,
  AppEnvironmentsShow,
} from "./AppEnvironment";
import {RouteMap} from "@/components/router";
import {AppDeploymentList, AppDeploymentShow} from "./AppDeployment";
import {AppBilling} from "./AppBilling";

export const appShowViews: RouteMap = {
  environments: {
    "$$index": <AppEnvironmentsShow />,
    ":envId": <AppEnvironmentShow />,
    "creation-template": <AppEnvironmentCreation />,
    "create": <AppEnvironmentCreate />,
    "diff": <AppEnvironmentDiff />,
  },
  deployments: {
    "$$index": <AppDeploymentList />,
    ":deploymentId": <AppDeploymentShow />,
  },
  billing: {
    $$index: <AppBilling />,
  },
};
