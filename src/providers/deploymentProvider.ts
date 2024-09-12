import {AppEnvDeployment} from "@jcloudify-api/typescript-client";
import {applicationApi, unwrap} from "@/services/poja-api";
import {
  authProvider,
  Dict,
  PagedResponse,
  PojaDataProvider,
  ToRecord,
} from "@/providers";

const toApiGetListFilter = ({
  envType = "All Environments",
  ...rest
}: Dict<any> = {}) => {
  return Object.assign({}, rest, {
    envType: envType === "All Environments" ? undefined : envType,
  });
};

export const deploymentProvider: PojaDataProvider<ToRecord<AppEnvDeployment>> =
  {
    async getList(page, perPage, filter = {}, _meta) {
      const uid = authProvider.getCachedWhoami()?.user?.id!;
      const {appId, envType, startDatetime, endDatetime} =
        toApiGetListFilter(filter);
      return (await unwrap(() =>
        applicationApi().getApplicationDeployments(
          uid,
          appId,
          envType,
          startDatetime,
          endDatetime,
          page,
          perPage
        )
      )) as PagedResponse<ToRecord<AppEnvDeployment>>;
    },
    async getOne(id, meta = {}) {
      const uid = authProvider.getCachedWhoami()?.user?.id!;
      return (await unwrap(() =>
        applicationApi().getApplicationDeployment(uid, meta.appId, id)
      )) as ToRecord<AppEnvDeployment>;
    },
    save(): Promise<any> {
      throw new Error("Function not implemented.");
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
