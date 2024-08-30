import {depls} from "#/deployment.mock";
import {Dict, PojaDataProvider, ToRecord} from "./types";
import {TODO_Deployment} from "@/services/poja-api";
import {isDateBetween} from "@/utils/date";

const toApiFilter = ({
  env_type = "All Environments",
  state,
  ...rest
}: Dict<any> = {}) => {
  return Object.assign({}, rest, {
    env_type: env_type === "All Environments" ? undefined : env_type,
    state: state === "Any" ? undefined : state,
  });
};

export const deploymentProvider: PojaDataProvider<ToRecord<TODO_Deployment>> = {
  getList(_page, _perPage, filter = {}, meta) {
    let {state, env_type, from, to} = toApiFilter(filter);
    // we'll remove these anyway so do not make any util fn for these
    const data = depls.filter(
      (depl) =>
        depl.application_id === meta?.application_id &&
        (!env_type || env_type === depl.target_env_type) &&
        (!state || state === depl.state) &&
        (!(from || to) || isDateBetween(depl.createdAt, from, to, "incl"))
    );
    return Promise.resolve({
      data,
    });
  },
  getOne(id): Promise<any> {
    return Promise.resolve(depls.find((depl) => depl.id === id));
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
  deleteMany(): Promise<any> {
    throw new Error("Function not implemented.");
  },
};
