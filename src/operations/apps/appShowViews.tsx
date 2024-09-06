import {
  AppEnvironmentCreate,
  AppEnvironmentCreation,
  AppEnvironmentDiff,
  AppEnvironmentList,
  AppEnvironmentShow,
  AppEnvironmentStackList,
  AppLambdaFunctionsList,
} from "./AppEnvironment";
import {RouteMap} from "@/components/router";
import {stackShowViews} from "@/operations/stacks";
import {lambdaFnShowViews} from "@/operations/lambda-functions";

export const appShowViews: RouteMap = {
  environments: {
    "$$index": <AppEnvironmentList />,
    ":envId": <AppEnvironmentShow />,
    "creation-template": <AppEnvironmentCreation />,
    "create": <AppEnvironmentCreate />,
    "diff": <AppEnvironmentDiff />,
  },
  deployments: {
    "$$index": <AppEnvironmentStackList />,
    "environments/:envId/stacks/:stackId": stackShowViews,
  },
  logs: {
    "$$index": <AppLambdaFunctionsList />,
    "environments/:envId/functions/:functionName": lambdaFnShowViews,
  },
};
