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
  getOne(id): Promise<any> {
    return Promise.resolve(envs.find((env) => env.id === id));
  },
  save(env): Promise<any> {
    return Promise.resolve(env);
  },
  saveAll(): Promise<any> {
    throw new Error("Function not implemented.");
  },
  delete(): Promise<any> {
    throw new Error("Function not implemented.");
  },
};
