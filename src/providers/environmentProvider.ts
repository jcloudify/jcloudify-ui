import {envs} from "#/environment.mock";
import {Environment} from "@jcloudify-api/typescript-client";
import {PojaDataProvider, ToRecord, authProvider} from "@/providers";
import {environmentApi, unwrap} from "@/services/poja-api";

export const environmentProvider: PojaDataProvider<ToRecord<Environment>> = {
  async getList(_page, _perPage, filter = {}) {
    const uid = authProvider.getCachedWhoami()?.user?.id!;
    return (
      await unwrap(() =>
        environmentApi().getApplicationEnvironments(uid, filter.appId)
      )
    ).data as ToRecord<Environment>[];
  },
  async getOne(id) {
    const uid = authProvider.getCachedWhoami()?.user?.id!;
    return (await unwrap(() => environmentApi().get(uid, filter.appId)))
      .data as ToRecord<Environment>[];
  },
  async save(env, meta = {}): Promise<any> {
    const uid = authProvider.getCachedWhoami()?.user?.id!;
    const res = (
      await unwrap(() =>
        environmentApi().crupdateApplicationEnvironments(uid, meta.appId, {
          data: [env],
        })
      )
    ).data as ToRecord<Environment>[];
    return res[0];
  },
  saveAll(): Promise<any> {
    throw new Error("Function not implemented.");
  },
  delete(): Promise<any> {
    throw new Error("Function not implemented.");
  },
};
