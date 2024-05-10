import {AppOverview} from "./AppOverview";

export const appShowViews: Record<string, React.ReactNode> = {
  environments: <AppOverview />,
  deployments: <h1>deployments</h1>,
  analytics: <h1>analytics</h1>,
  logs: <h1>logs</h1>,
};
