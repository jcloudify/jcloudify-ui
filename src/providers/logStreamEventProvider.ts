import {LogStreamEvent} from "@jcloudify-api/typescript-client";
import {nanoid} from "nanoid";
import {environmentApi, unwrap} from "@/services/poja-api";
import {
  authProvider,
  PagedResponse,
  PojaDataProvider,
  ToRecord,
} from "@/providers";

export const logStreamEventProvider: PojaDataProvider<
  ToRecord<LogStreamEvent>
> = {
  async getList(page, perPage, filter = {}, _meta) {
    const uid = authProvider.getCachedWhoami()?.user?.id!;
    const logStreamEventsResponse = (await unwrap(() =>
      environmentApi().getFunctionLogStreamEvents(
        uid,
        filter.appId,
        filter.envId,
        filter.functionName,
        filter.logGroupName,
        filter.logStreamName,
        page,
        perPage
      )
    )) as PagedResponse<ToRecord<LogStreamEvent>>;
    return {
      ...logStreamEventsResponse,
      data: logStreamEventsResponse.data.map((ls) => ({...ls, id: nanoid()})),
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
