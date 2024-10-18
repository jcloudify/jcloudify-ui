import {Environment, EnvironmentType} from "@jcloudify-api/typescript-client";
import {useGetList} from "react-admin";
import {ToRecord} from "@/providers";
import {useMemo} from "react";

export const useGetEnvironmentMap = (appId: string | undefined) => {
  const {data: environments = [], isLoading} = useGetList<
    ToRecord<Environment>
  >("environments", {
    filter: {
      appId,
    },
  });

  const environmentMap = useMemo(() => {
    const map: Record<"prod" | "preprod", ToRecord<Environment> | undefined> = {
      prod: undefined,
      preprod: undefined,
    };
    environments.forEach((environment) => {
      map[
        environment.environment_type?.toLowerCase()! as Lowercase<
          keyof typeof EnvironmentType
        >
      ] = environment;
    });
    return map;
  }, [environments]);

  return {
    environmentMap,
    isLoading,
  };
};
