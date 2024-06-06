import {depls} from "#/deployment.mock";
import {PojaDataProvider, ToRecord} from "./types";
import {TODO_Deployment} from "@/services/poja-api";

export const deploymentProvider: PojaDataProvider<ToRecord<TODO_Deployment>> = {
  getList(_page, _perPage, _filter, meta) {
    return Promise.resolve(
      depls.filter((depl) => depl.application_id === meta?.application_id)
    );
  },
  getOne(id): Promise<any> {
    return Promise.resolve(depls.find((depl) => depl.id === id));
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
};
