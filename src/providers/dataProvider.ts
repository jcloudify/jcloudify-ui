import {DataProvider as RADataProvider} from "react-admin";
import {normalizeParams} from "./util";
import {PojaDataProvider} from "./types";
import {
  applicationProvider,
  envVariablesProvider,
  environmentProvider,
} from "./";

const getProvider = (resource: string): PojaDataProvider<any> => {
  switch (resource) {
    case "applications":
      return applicationProvider;
    case "environments":
      return environmentProvider;
    case "env_variables":
      return envVariablesProvider;
    default:
      throw new Error("Unexpected resource: " + resource);
  }
};

export const dataProvider: RADataProvider = {
  async getList(resource, raParams) {
    const {
      pagination: {page, perPage},
      filter,
      meta,
    } = normalizeParams(resource, raParams);
    const result = await getProvider(resource).getList(
      page,
      perPage,
      filter,
      meta
    );
    return {data: result, total: Number.MAX_SAFE_INTEGER};
  },
  async getOne(resource, params) {
    const result = await getProvider(resource).getOne(params.id, params.meta);
    return {data: result};
  },
  async update(resource, params) {
    const result = await getProvider(resource).save(params.data);
    return {data: result};
  },
  async create(resource, params) {
    const result = await getProvider(resource).save(params.data);
    return {data: result};
  },
  async delete(resource, params) {
    const result = await getProvider(resource).delete(params.id);
    return {data: result};
  },
  getMany() {
    throw new Error("Function not implemented.");
  },
  getManyReference() {
    throw new Error("Function not implemented.");
  },
  deleteMany() {
    throw new Error("Function not implemented.");
  },
  updateMany() {
    throw new Error("Function not implemented.");
  },
};
