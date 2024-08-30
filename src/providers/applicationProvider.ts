import {Application} from "@jcloudify-api/typescript-client";
import {
  PagedResponse,
  PojaDataProvider,
  ToRecord,
  authProvider,
} from "@/providers";
import {applicationApi, unwrap} from "@/services/poja-api";
import {toArchived} from "@/providers/util";

export const applicationProvider: PojaDataProvider<ToRecord<Application>> = {
  async getList(page, perPage) {
    const uid = authProvider.getCachedWhoami()?.user?.id!;
    return (await unwrap(() =>
      applicationApi().getApplications(uid, undefined, page, perPage)
    )) as PagedResponse<ToRecord<Application>>;
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
  async delete(app) {
    const uid = authProvider.getCachedWhoami()?.user?.id!;
    const [deleted] = (
      await unwrap(() =>
        applicationApi().crupdateApplications(uid, {
          data: [toArchived({...app, user_id: uid})],
        })
      )
    ).data! as ToRecord<Application>[];
    return deleted;
  },
  saveAll() {
    throw new Error("Function not implemented.");
  },
  deleteMany() {
    throw new Error("Function not implemented.");
  },
};
