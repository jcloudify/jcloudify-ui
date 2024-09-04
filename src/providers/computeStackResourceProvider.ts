import {ComputeStackResource} from "@jcloudify-api/typescript-client";
import {stackApi, unwrap} from "@/services/poja-api";
import {
  authProvider,
  PagedResponse,
  PojaDataProvider,
  ToRecord,
} from "@/providers";

export const computeStackResourceProvider: PojaDataProvider<
  ToRecord<ComputeStackResource>
> = {
  async getList(page, perPage, filter = {}, _meta) {
    const uid = authProvider.getCachedWhoami()?.user?.id!;
    return (await unwrap(() =>
      stackApi().getComputeStackResources(
        uid,
        filter.appId,
        filter.envId,
        page,
        perPage
      )
    )) as PagedResponse<ToRecord<ComputeStackResource>>;
  },
  getOne() {
    throw new Error("Function not implemented.");
  },
  deleteMany() {
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
};
