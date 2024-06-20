import {Log} from "@jcloudify-api/typescript-client";
import {PojaDataProvider} from "./types";
import {logs} from "#/logs.mock";

export const logsProvider: PojaDataProvider<Required<Log>> = {
  getList(_page, _perPage, filter, _meta) {
    return Promise.resolve(logs(filter?.environment_id));
  },
  getOne(): Promise<any> {
    throw new Error("Function not implemented.");
    // return Promise.resolve(logs.find((log) => log.id === id));
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
