import {Stack} from "@jcloudify-api/typescript-client";
import {Dict, PojaDataProvider, ToRecord} from "./types";
import {stacks} from "#/stack.mock";

export const stackProvider: PojaDataProvider<ToRecord<Stack>> = {
  getList(_page, _perPage, filter = {}, _meta) {
    return Promise.resolve(stacks[filter.appId][filter.env_id] || []);
  },
  getOne(id, meta: Dict<string> = {}) {
    const {appId, envId} = meta;
    return Promise.resolve(
      stacks[appId][envId].find((stack) => stack.id === id)!
    );
  },
  save() {
    throw new Error("Function not implemented.");
  },
  saveAll() {
    throw new Error("Function not implemented.");
  },
  delete() {
    throw new Error("Function not implemented.");
  },
};
