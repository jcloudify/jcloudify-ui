import {DeploymentState} from "@jcloudify-api/typescript-client";
import {PojaDataProvider, ToRecord, authProvider} from "@/providers";
import {applicationApi, unwrap} from "@/services/poja-api";

export const deploymentStateProvider: PojaDataProvider<
  ToRecord<DeploymentState>
> = {
  async getOne(deploymentId, meta = {}) {
    const uid = authProvider.getCachedWhoami()?.user?.id!;
    return (await unwrap(() =>
      applicationApi().getApplicationDeploymentStates(
        uid,
        meta.appId,
        deploymentId
      )
    )) as ToRecord<DeploymentState>;
  },
  getList() {
    throw new Error("Function not implemented.");
  },
  save() {
    throw new Error("Function not implemented.");
  },
  saveAll() {
    throw new Error("Function not implemented.");
  },
  delete() {
    throw new Error("Function not implemented.");
  },
  deleteMany() {
    throw new Error("Function not implemented.");
  },
};
