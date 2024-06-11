import {AppEnvironment} from "./AppEnvironment";
import {AppDeployment} from "./AppDeployment";
import {AppLogs} from "./AppLogs";

export const appShowViews: Record<string, React.ReactNode> = {
  environments: <AppEnvironment />,
  deployments: <AppDeployment />,
  analytics: <h1>analytics</h1>,
  logs: <AppLogs />,
};
