import {depls} from "#/deployment.mock";
import {reverseObjectKeyValues} from "@/utils/object";
import {Dict, PojaDataProvider, ToRecord} from "./types";
import {TODO_Deployment, TODO_DeploymentStateEnum} from "@/services/poja-api";
import {} from "dayjs";

const toApiDeploymentState = reverseObjectKeyValues(TODO_DeploymentStateEnum);

const toApiFilter = ({
  env_type = "All Environments",
  status,
  ...rest
}: Dict<string> = {}) => {
  return Object.assign({}, rest, {
    env_type: env_type === "All Environments" ? undefined : env_type,
    status: status ? toApiDeploymentState[status] : undefined,
  });
};

export const deploymentProvider: PojaDataProvider<ToRecord<TODO_Deployment>> = {
  getList(_page, _perPage, filter = {}, meta) {
    const {status, env_type, from, to} = toApiFilter(filter);
    // we'll remove these anyway so do not make any util fn for these
    //
    return Promise.resolve(
      depls.filter(
        (depl) =>
          depl.application_id === meta?.application_id &&
          (!env_type || env_type === depl.target_env_type) &&
          (!status || status === depl.state) &&
          (!from || depl.createdAt >= new Date(from)) &&
          (!to || depl.createdAt <= new Date(to))
      )
    );
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
};
