import {envs} from "#/environment.mock";
import {Environment} from "@jcloudify-api/typescript-client";
import {PojaDataProvider, ToRecord} from "./types";
import {apps} from "#/application.mock";

export const environmentProvider: PojaDataProvider<ToRecord<Environment>> = {
  getList(_page, _perPage, _filter, meta) {
    return Promise.resolve(
      apps.find((app) => app.id === meta?.application_id)
        ?.environments as ToRecord<Environment>[]
    );
  },
  getOne(id): Promise<any> {
    return Promise.resolve(envs.find((env) => env.id === id));
  },
  save(env): Promise<any> {
    return Promise.resolve(env);
  },
  saveAll(): Promise<any> {
    throw new Error("Function not implemented.");
  },
  delete(): Promise<any> {
    throw new Error("Function not implemented.");
  },
};
