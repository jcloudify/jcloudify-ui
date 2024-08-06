import {DataProvider} from "react-admin";
import {normalizeParams} from "./util";
import {PojaDataProvider} from "./types";
import {
  applicationProvider,
  deploymentProvider,
  environmentProvider,
  githubAppInstallationProvider,
  logsProvider,
  pojaConfProvider,
  stackProvider,
  userProvider,
  paymentProvider,
  paymentMethodProvider,
  paymentCustomerProvider,
} from "./";

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
    case "pojaConf":
      return pojaConfProvider;
    case "githubAppInstallation":
      return githubAppInstallationProvider;
    case "paymentMethods":
      return paymentMethodProvider;
    case "payments":
      return paymentProvider;
    case "paymentCustomers":
      return paymentCustomerProvider;
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
  async create(resource, params) {
    const result = await getProvider(resource).save(params.data, params.meta);
    return {data: result};
  },
  async delete(resource, params) {
    const result = await getProvider(resource).delete(params.id.toString());
    return {data: result};
  },
  async updateMany(resource, params) {
    const result = await getProvider(resource).saveAll(params.data as any[]);
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
};
