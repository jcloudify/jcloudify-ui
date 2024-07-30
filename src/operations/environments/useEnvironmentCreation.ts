import {Environment} from "@jcloudify-api/typescript-client";
import {useMemo} from "react";
import {useGetList} from "react-admin";
import {ENVIRONMENT_TYPES} from "@/services/poja-api";
import {ToRecord} from "@/providers";

export const useEnvironmentCreation = (appId: string | undefined) => {
  const {data: environments = []} = useGetList<ToRecord<Environment>>(
    "environments",
    {
      filter: {
        appId,
      },
    }
  );

  const createdTypes = environments.map(
    (environment) => environment.environment_type!
  );

  const creatable = useMemo(
    () => ENVIRONMENT_TYPES.filter((t) => !createdTypes.includes(t)),
    [createdTypes]
  );
  const canCreateMore = !!creatable.length;

  return {
    creatable,
    created: environments,
    canCreateMore,
  };
};
