import {GITHUB_URL_PREFIX} from "./constant";

export const getURLComponent = (owner: string, repo: string) => {
  return {
    url: GITHUB_URL_PREFIX + owner + "/" + repo,
    branch: (branchName: string) =>
      GITHUB_URL_PREFIX + owner + "/" + repo + "/tree/" + branchName,
    commit: (sha: string) =>
      GITHUB_URL_PREFIX + owner + "/" + repo + "/commit/" + sha,
  };
};