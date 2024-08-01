import {Environment} from "@jcloudify-api/typescript-client";
import {
  PagedResponse,
  PojaDataProvider,
  ToRecord,
  authProvider,
  pojaConfProvider,
} from "@/providers";
import {environmentApi, unwrap} from "@/services/poja-api";

export const environmentProvider: PojaDataProvider<ToRecord<Environment>> = {
  async getList(_page, _perPage, filter = {}) {
    const uid = authProvider.getCachedWhoami()?.user?.id!;
    return (await unwrap(() =>
      environmentApi().getApplicationEnvironments(uid, filter.appId)
    )) as PagedResponse<ToRecord<Environment>>;
  },
  async getOne(id, meta = {}) {
    const uid = authProvider.getCachedWhoami()?.user?.id!;
    return (await unwrap(() =>
      environmentApi().getApplicationEnvironmentById(
        uid,
        meta.appId,
        id.toString()
      )
    )) as ToRecord<Environment>;
  },
  async save(toCreate, meta = {}) {
    const uid = authProvider.getCachedWhoami()?.user?.id!;

    const created = (
      await unwrap(() =>
        environmentApi().crupdateApplicationEnvironments(uid, meta.appId, {
          data: [toCreate],
        })
      )
    ).data as ToRecord<Environment>[];

    await pojaConfProvider.save(meta.with_config, {
      appId: meta.appId,
      envId: toCreate.id,
    });
    return created[0];
  },
  saveAll(): Promise<any> {
    throw new Error("Function not implemented.");
  },
  delete(): Promise<any> {
    throw new Error("Function not implemented.");
  },
};
