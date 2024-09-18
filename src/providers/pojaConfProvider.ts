import {OneOfPojaConf} from "@jcloudify-api/typescript-client";
import {HttpError} from "react-admin";
import {isAxiosError} from "axios";
import {PojaDataProvider, ToRecord, authProvider} from "@/providers";
import {applicationApi, environmentApi, unwrap} from "@/services/poja-api";
import {make_error_map_from_400_bad_request} from "@/operations/utils/errors";

export const pojaConfProvider: PojaDataProvider<ToRecord<OneOfPojaConf>> = {
  async getList(_page, _perPage, _filter = {}) {
    throw new Error("Function not implemented.");
  },
  async getOne(ownerId, meta = {}) {
    const uid = authProvider.getCachedWhoami()?.user?.id!;
    const getConfig =
      meta.owner === "environment"
        ? environmentApi().getApplicationEnvironmentConfig.bind(
            environmentApi()
          )
        : applicationApi().getApplicationDeploymentConfig.bind(
            environmentApi()
          );
    const conf = (await unwrap(() =>
      getConfig(uid, meta.appId, ownerId.toString())
    )) as ToRecord<OneOfPojaConf>;

    conf.id = ownerId;
    return conf;
  },
  async save(conf, meta = {}) {
    const uid = authProvider.getCachedWhoami()?.user?.id!;
    try {
      const saved = (await unwrap(() =>
        environmentApi().configureApplicationEnv(
          uid,
          meta.appId,
          // no depl config mutation
          meta.ownerId,
          conf
        )
      )) as ToRecord<OneOfPojaConf>;
      saved.id = conf.id;
      return saved;
    } catch (e) {
      if (isAxiosError(e)) {
        if (e.response?.status === 400) {
          throw new HttpError("", 400, {
            errors: make_error_map_from_400_bad_request(
              e.response?.data.message
            ),
          });
        }
      }
      throw e;
    }
  },
  saveAll(): Promise<any> {
    throw new Error("Function not implemented.");
  },
  delete(): Promise<any> {
    throw new Error("Function not implemented.");
  },
  deleteMany(): Promise<any> {
    throw new Error("Function not implemented.");
  },
};
