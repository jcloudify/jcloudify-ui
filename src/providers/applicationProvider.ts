import {apps} from "#/application.mock";
import {PojaDataProvider} from "./types";

export const applicationProvider: PojaDataProvider<any /* TODO: api client type */> =
  {
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
