import {StackEvent} from "@jcloudify-api/typescript-client";
import {stackApi, unwrap} from "@/services/poja-api";
import {
  authProvider,
  PagedResponse,
  PojaDataProvider,
  ToRecord,
} from "@/providers";

export const stackEventProvider: PojaDataProvider<ToRecord<StackEvent>> = {
  async getList(_page, _perPage, filter = {}, _meta) {
    const uid = authProvider.getCachedWhoami()?.user?.id!;
    const eventResponse = (await unwrap(() =>
      stackApi().getStackEvents(
        uid,
        filter.appId,
        filter.env_id,
        filter.stack_id
      )
    )) as PagedResponse<ToRecord<StackEvent>>;
    return {
      ...eventResponse,
      data: eventResponse.data.map((event) => ({...event, id: event.event_id!})),
    };
  },
  getOne() {
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
