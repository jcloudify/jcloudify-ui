import {GithubAppInstallation} from "@jcloudify-api/typescript-client";
import {PojaDataProvider, ToRecord, authProvider} from "@/providers";
import {githubAppInstallationApi, unwrap} from "@/services/poja-api";

export const githubAppInstallationProvider: PojaDataProvider<
  ToRecord<GithubAppInstallation>
> = {
  async getList() {
    const uid = authProvider.getCachedWhoami()?.user?.id!;
    return (
      await unwrap(() => githubAppInstallationApi().getUserInstallations(uid))
    ).data as ToRecord<GithubAppInstallation>[];
  },
  async save(installation) {
    const uid = authProvider.getCachedWhoami()?.user?.id!;
    const res = (
      await unwrap(() =>
        githubAppInstallationApi().crupdateGithubAppInstallations(uid, {
          data: [installation],
        })
      )
    ).data as ToRecord<GithubAppInstallation>[];
    return res[0];
  },
  getOne() {
    throw new Error("Function not implemented.");
  },
  saveAll() {
    throw new Error("Function not implemented.");
  },
  delete() {
    throw new Error("Function not implemented.");
  },
};
