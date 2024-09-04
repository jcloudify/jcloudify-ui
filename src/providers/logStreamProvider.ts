import {LogStream} from "@jcloudify-api/typescript-client";
import {environmentApi, unwrap} from "@/services/poja-api";
import {
  authProvider,
  PagedResponse,
  PojaDataProvider,
  ToRecord,
} from "@/providers";

export const logStreamProvider: PojaDataProvider<ToRecord<LogStream>> = {
  async getList(page, perPage, filter = {}, _meta) {
    const uid = authProvider.getCachedWhoami()?.user?.id!;
    return (await unwrap(() =>
      environmentApi().getFunctionLogStreams(
        uid,
        filter.appId,
        filter.envId,
        filter.functionName,
        filter.logGroupName,
        page,
        perPage
      )
    )) as PagedResponse<ToRecord<LogStream>>;
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
