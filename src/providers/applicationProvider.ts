import {apps} from "#/application.mock";
import {Application} from "@jcloudify-api/typescript-client";
import {PojaDataProvider, ToRecord} from "./types";

export const applicationProvider: PojaDataProvider<ToRecord<Application>> = {
  getList() {
    return Promise.resolve(apps);
  },
  getOne(id): Promise<any> {
    return Promise.resolve(apps.find((app) => app.id === id));
  },
  save(app): Promise<any> {
    return Promise.resolve(app);
  },
  saveAll(): Promise<any> {
    throw new Error("Function not implemented.");
  },
  delete(): Promise<any> {
    throw new Error("Function not implemented.");
  },
};
