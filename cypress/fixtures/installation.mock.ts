import {GithubAppInstallation} from "@jcloudify-api/typescript-client";
import {user1} from "./user.mock";

export const user1_installations: GithubAppInstallation[] = [
  {
    id: "user1_installation_1",
    owner: user1.username,
    type: "USER",
    gh_installation_id: 1,
    gh_avatar_url: user1.avatar,
  },
];
