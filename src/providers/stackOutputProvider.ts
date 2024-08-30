import {StackOutput} from "@jcloudify-api/typescript-client";
import {nanoid} from "nanoid";
import {stackApi, unwrap} from "@/services/poja-api";
import {
  authProvider,
  PagedResponse,
  PojaDataProvider,
  ToRecord,
} from "@/providers";

export const stackOutputProvider: PojaDataProvider<ToRecord<StackOutput>> = {
  async getList(page, perPage, filter = {}, _meta) {
    const uid = authProvider.getCachedWhoami()?.user?.id!;
    const outputResponse = (await unwrap(() =>
      stackApi().getStackOutputs(
        uid,
        filter.appId,
        filter.env_id,
        filter.stack_id,
        page,
        perPage
      )
    )) as PagedResponse<ToRecord<StackOutput>>;
    return {
      ...outputResponse,
      data: outputResponse.data.map((output) => ({
        ...output,
        id: output.key + nanoid(),
      })),
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
  deleteMany(): Promise<any> {
    throw new Error("Function not implemented.");
  },
};
