import {variables} from "#/environment-variables.mock";
import {PojaDataProvider} from "./types";

export const envVariablesProvider: PojaDataProvider<any /* TODO: api client type */> =
  {
    getList(_page, _perPage, _filter, meta) {
      return Promise.resolve(
        variables.filter((variable) => variable.environment_id === meta?.env_id)
      );
    },
    getOne(id): Promise<any> {
      return Promise.resolve(variables.find((variable) => variable.id === id));
    },
    save(variable): Promise<any> {
      return Promise.resolve(variable);
    },
    delete(): Promise<any> {
      throw new Error("Function not implemented.");
    },
  };
