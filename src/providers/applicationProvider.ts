import {apps} from "#/application.mock";
import {Application} from "@jcloudify-api/typescript-client";
import {applicationApi, unwrap} from "@/services/poja-api";
import {authProvider, PojaDataProvider, ToRecord} from "@/providers";

export const applicationProvider: PojaDataProvider<ToRecord<Application>> = {
  async getList() {
    const uid = authProvider.getCachedWhoami()?.user?.id;
    const res = applicationApi().getApplications(uid!, "", 1, 500);
    return (await unwrap(() => res)) as ToRecord<Application>[];
  },
  getOne(id): Promise<any> {
    return Promise.resolve(apps.find((app) => app.id === id));
  },
  async save(app) {
    const uid = authProvider.getCachedWhoami()?.user?.id;
    return (await unwrap(() =>
      applicationApi().crupdateApplications(uid!, {
        data: [app],
      })
    )) as ToRecord<Application>;
  },
  saveAll(): Promise<any> {
    throw new Error("Function not implemented.");
  },
  delete(): Promise<any> {
    throw new Error("Function not implemented.");
  },
};
