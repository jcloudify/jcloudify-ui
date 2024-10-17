import {Environment, EnvironmentType} from "@jcloudify-api/typescript-client";
import {ToRecord} from "@/providers";

export const extactEnvironments = (environments: ToRecord<Environment>[]) => {
  const environmentMap: Record<
    EnvironmentType,
    ToRecord<Environment> | undefined
  > = {PREPROD: undefined, PROD: undefined};
  environments.forEach((environment) => {
    const {environment_type} = environment;
    environmentMap[`${environment_type!}`] = environment;
  });
  return environmentMap;
};
