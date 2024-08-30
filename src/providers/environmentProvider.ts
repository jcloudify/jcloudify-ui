import {Environment, PojaConf1} from "@jcloudify-api/typescript-client";
import {
  PagedResponse,
  PojaDataProvider,
  ToRecord,
  authProvider,
  pojaConfProvider,
} from "@/providers";
import {environmentApi, unwrap} from "@/services/poja-api";
import {toArchived} from "@/providers/util";

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
  async save(environment_with_config, meta = {}) {
    const {to_create, ...pojaConf} =
      environment_with_config as unknown as PojaConf1 & {
        to_create: ToRecord<Environment>;
      };

    const uid = authProvider.getCachedWhoami()?.user?.id!;

    const [created] = (
      await unwrap(() =>
        environmentApi().crupdateApplicationEnvironments(uid, meta.appId, {
          data: [to_create],
        })
      )
    ).data as ToRecord<Environment>[];

    await pojaConfProvider.save(pojaConf as ToRecord<PojaConf1>, {
      appId: meta.appId,
      envId: created.id,
    });
    return created;
  },
  async deleteMany(environments, meta = {}) {
    const uid = authProvider.getCachedWhoami()?.user?.id!;
    return (
      await unwrap(() =>
        environmentApi().crupdateApplicationEnvironments(uid, meta.appId, {
          data: environments.map(toArchived),
        })
      )
    ).data as ToRecord<Environment>[];
  },
  delete(): Promise<any> {
    throw new Error("Function not implemented.");
  },
  saveAll(): Promise<any> {
    throw new Error("Function not implemented.");
  },
};
