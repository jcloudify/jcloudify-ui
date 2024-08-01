import {Log} from "@jcloudify-api/typescript-client";
import {PojaDataProvider} from "./types";
import {logs} from "#/logs.mock";

export const logsProvider: PojaDataProvider<Required<Log>> = {
  getList(_page, _perPage, filter, _meta) {
    const data = logs(filter?.environment_id);
    return Promise.resolve({
      data,
    });
  },
  getOne(id, meta): Promise<any> {
    return Promise.resolve(
      logs(meta?.environment_id).find((log) => log.id === id)
    );
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
