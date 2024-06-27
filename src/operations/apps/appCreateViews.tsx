import {RouteMap} from "@/components/router";
import {AppBootstrap} from "./AppBootstrap";
import {AppGithubImport} from "./AppGithubImport";

export const appCreateViews: RouteMap = {
  "new": <AppBootstrap />,
  "import-git-repo": <AppGithubImport />,
};
