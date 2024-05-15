import {AppEnvironment} from "./AppEnvironment";

export const appShowViews: Record<string, React.ReactNode> = {
  environments: <AppEnvironment />,
  deployments: <h1>deployments</h1>,
  analytics: <h1>analytics</h1>,
  logs: <h1>logs</h1>,
};
