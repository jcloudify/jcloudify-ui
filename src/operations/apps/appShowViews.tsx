import {AppEnvironment} from "./AppEnvironment";
import {AppDeployment} from "./AppDeployment";

export const appShowViews: Record<string, React.ReactNode> = {
  environments: <AppEnvironment />,
  deployments: <AppDeployment />,
  analytics: <h1>analytics</h1>,
  logs: <h1>logs</h1>,
};
