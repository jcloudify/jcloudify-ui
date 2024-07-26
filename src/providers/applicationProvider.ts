import {Application} from "@jcloudify-api/typescript-client";
import {PojaDataProvider, ToRecord, authProvider} from "@/providers";
import {applicationApi, unwrap} from "@/services/poja-api";

export const applicationProvider: PojaDataProvider<ToRecord<Application>> = {
  async getList() {
    const uid = authProvider.getCachedWhoami()?.user?.id!;
    return (
      await unwrap(() => applicationApi().getApplications(uid, undefined))
    ).data as ToRecord<Application>[];
  },
  async getOne(id) {
    const uid = authProvider.getCachedWhoami()?.user?.id!;
    return (await unwrap(() =>
      applicationApi().getApplicationById(uid, id.toString())
    )) as ToRecord<Application>;
  },
  async save(app) {
    const uid = authProvider.getCachedWhoami()?.user?.id!;
    const apps = (
      await unwrap(() =>
        applicationApi().crupdateApplications(uid, {
          data: [{...app, user_id: uid}],
        })
      )
    ).data!;
    return apps[0] as ToRecord<Application>;
  },
  saveAll() {
    throw new Error("Function not implemented.");
  },
  delete() {
    throw new Error("Function not implemented.");
  },
};
