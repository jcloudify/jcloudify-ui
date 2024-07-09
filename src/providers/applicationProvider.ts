import {apps} from "#/application.mock";
import {TODO_Application} from "@/services/poja-api";
import {PojaDataProvider, ToRecord} from "./types";

export const applicationProvider: PojaDataProvider<ToRecord<TODO_Application>> =
  {
    getList() {
      return Promise.resolve(apps);
    },
    getOne(id) {
      return Promise.resolve(apps.find((app) => app.id === id)!);
    },
    save(app) {
      return Promise.resolve(app);
    },
    saveAll() {
      throw new Error("Function not implemented.");
    },
    delete() {
      throw new Error("Function not implemented.");
    },
  };
