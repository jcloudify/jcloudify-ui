import {OneOfPojaConf} from "@jcloudify-api/typescript-client";
import {PojaDataProvider, ToRecord, authProvider} from "@/providers";
import {environmentApi, unwrap} from "@/services/poja-api";

export const pojaConfProvider: PojaDataProvider<ToRecord<OneOfPojaConf>> = {
  async getList(_page, _perPage, _filter = {}) {
    throw new Error("Function not implemented.");
  },
  async getOne(eId, meta = {}) {
    const uid = authProvider.getCachedWhoami()?.user?.id!;
    const conf = (await unwrap(() =>
      environmentApi().getApplicationEnvironmentConfig(
        uid,
        meta.appId,
        eId.toString()
      )
    )) as ToRecord<OneOfPojaConf>;

    conf.id = eId;
    return conf;
  },
  async save(conf, meta = {}) {
    const uid = authProvider.getCachedWhoami()?.user?.id!;
    return (await unwrap(() =>
      environmentApi().configureApplicationEnv(
        uid,
        meta.appId,
        meta.envId,
        conf
      )
    )) as ToRecord<OneOfPojaConf>;
  },
  saveAll(): Promise<any> {
    throw new Error("Function not implemented.");
  },
  delete(): Promise<any> {
    throw new Error("Function not implemented.");
  },
};
