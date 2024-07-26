import {EnvironmentVariable} from "@jcloudify-api/typescript-client";
import {PojaDataProvider} from "./types";

export const envVariablesProvider: PojaDataProvider<
  Required<EnvironmentVariable>
> = {
  getList(_page, _perPage, _filter, meta) {
    return Promise.resolve([].filter((variable) => undefined === meta?.env_id));
  },
  getOne(id): Promise<any> {
    return Promise.resolve([].find((variable) => undefined === id));
  },
  save(variable): Promise<any> {
    return Promise.resolve(variable);
  },
  saveAll(variables): Promise<any[]> {
    return Promise.resolve(variables);
  },
  delete(): Promise<any> {
    throw new Error("Function not implemented.");
  },
};
