import {Stack} from "@jcloudify-api/typescript-client";
import {stackApi, unwrap} from "@/services/poja-api";
import {
  authProvider,
  Dict,
  PagedResponse,
  PojaDataProvider,
  ToRecord,
} from "@/providers";

export const stackProvider: PojaDataProvider<ToRecord<Stack>> = {
  async getList(page, perPage, filter = {}, _meta) {
    const uid = authProvider.getCachedWhoami()?.user?.id!;
    return (await unwrap(() =>
      stackApi().getEnvironmentStacks(
        uid,
        filter.appId,
        filter.env_id,
        page,
        perPage
      )
    )) as PagedResponse<ToRecord<Stack>>;
  },
  async getOne(id, meta: Dict<string> = {}) {
    const uid = authProvider.getCachedWhoami()?.user?.id!;
    return (await unwrap(() =>
      stackApi().getStackById(uid, meta.appId, meta.envId, id.toString())
    )) as ToRecord<Stack>;
  },
  async deleteMany(stacks, meta = {}) {
    const uid = authProvider.getCachedWhoami()?.user?.id!;
    return (
      await unwrap(() =>
        stackApi().initiateStackDeletion(uid, meta.appId, meta.envId, {
          data: stacks.map(({stack_type}) => ({
            stack_type,
          })),
        })
      )
    ).data as ToRecord<Stack>[];
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
