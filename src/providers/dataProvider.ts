import {DataProvider, RaRecord} from "react-admin";
import {normalizeParams} from "./util";
import {PojaDataProvider} from "./types";
import {
  applicationProvider,
  deploymentProvider,
  environmentProvider,
  githubAppInstallationProvider,
  logsProvider,
  pojaConfProvider,
  stackEventProvider,
  stackOutputProvider,
  stackProvider,
  userProvider,
} from "./";
import {pojaVersionProvider} from "./pojaVersionProvider";

/**
 * default RA deleteMany only takes an array of ids,
 * in our api, we need the records, so we'll pass the records under the 'meta' object with this unique symbol
 */
export const DELETE_RESOURCES = Symbol("resources.delete");

const getProvider = (resource: string): PojaDataProvider<any> => {
  switch (resource) {
    case "applications":
      return applicationProvider;
    case "deployments":
      return deploymentProvider;
    case "environments":
      return environmentProvider;
    case "logs":
      return logsProvider;
    case "users":
      return userProvider;
    case "stacks":
      return stackProvider;
    case "stackEvents":
      return stackEventProvider;
    case "stackOutputs":
      return stackOutputProvider;
    case "pojaConf":
      return pojaConfProvider;
    case "pojaVersions":
      return pojaVersionProvider;
    case "githubAppInstallation":
      return githubAppInstallationProvider;
    default:
      throw new Error("Unexpected resource: " + resource);
  }
};

export const dataProvider: DataProvider = {
  async getList(resource, raParams) {
    const {
      pagination: {page, perPage},
      filter,
      meta,
    } = normalizeParams(resource, raParams);
    const {data, count, has_previous} = await getProvider(resource).getList(
      page,
      perPage,
      filter,
      meta
    );

    return {
      data,
      total: undefined,
      pageInfo: {
        hasPreviousPage: has_previous,
        hasNextPage: count === 10,
      },
    };
  },
  async getOne(resource, params) {
    const result = await getProvider(resource).getOne(
      params.id.toString(),
      params.meta
    );
    return {data: result};
  },
  async update(resource, params) {
    const result = await getProvider(resource).save(params.data, params.meta);
    return {data: result};
  },
  async delete(resource, params) {
    const result = await getProvider(resource).delete(
      params.previousData,
      params.meta
    );
    return {data: result};
  },
  async create(resource, params) {
    const result = await getProvider(resource).save(params.data, params.meta);
    return {data: result};
  },
  async updateMany(resource, params) {
    const result = await getProvider(resource).saveAll(params.data as any[]);
    return {data: result};
  },
  async deleteMany(resource, params) {
    const result: RaRecord<string>[] = await getProvider(resource).deleteMany(
      params.meta[DELETE_RESOURCES],
      params.meta
    );
    return {data: result.map((record) => record.id)};
  },
  getMany() {
    throw new Error("Function not implemented.");
  },
  getManyReference() {
    throw new Error("Function not implemented.");
  },
};
