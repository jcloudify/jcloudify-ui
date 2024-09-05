import {LogGroup} from "@jcloudify-api/typescript-client";
import {environmentApi, unwrap} from "@/services/poja-api";
import {
  authProvider,
  PagedResponse,
  PojaDataProvider,
  ToRecord,
} from "@/providers";

export const logGroupProvider: PojaDataProvider<ToRecord<LogGroup>> = {
  async getList(page, perPage, filter = {}, _meta) {
    const uid = authProvider.getCachedWhoami()?.user?.id!;
    const logGroupsResponse = (await unwrap(() =>
      environmentApi().getFunctionLogGroups(
        uid,
        filter.appId,
        filter.envId,
        filter.functionName,
        page,
        perPage
      )
    )) as PagedResponse<ToRecord<LogGroup>>;
    return {
      ...logGroupsResponse,
      data: logGroupsResponse.data.map((lg) => ({...lg, id: lg.name!})),
    };
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
