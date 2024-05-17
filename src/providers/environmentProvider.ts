import {envs} from "#/environment.mock";
import {Environment} from "@jcloudify-api/typescript-client";
import {PojaDataProvider} from "./types";

export const environmentProvider: PojaDataProvider<Required<Environment>> = {
  getList(_page, _perPage, _filter, meta) {
    return Promise.resolve(
      envs.filter((env) => env.application_id === meta?.application_id)
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
