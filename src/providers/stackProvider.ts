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
  async getList(_page, _perPage, filter = {}, _meta) {
    const uid = authProvider.getCachedWhoami()?.user?.id!;
    return (await unwrap(() =>
      stackApi().getEnvironmentStacks(uid, filter.appId, filter.env_id)
    )) as PagedResponse<ToRecord<Stack>>;
  },
  async getOne(id, meta: Dict<string> = {}) {
    const uid = authProvider.getCachedWhoami()?.user?.id!;
    return (await unwrap(() =>
      stackApi().getStackById(uid, meta.appId, meta.envId, id.toString())
    )) as ToRecord<Stack>;
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
