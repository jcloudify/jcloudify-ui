import {envs} from "#/environment.mock";
import {PojaDataProvider} from "./types";

export const environmentProvider: PojaDataProvider<any /* TODO: api client type */> =
  {
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
    delete(): Promise<any> {
      throw new Error("Function not implemented.");
    },
  };
