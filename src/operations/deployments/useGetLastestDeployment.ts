import {ToRecord} from "@/providers";
import {
  AppEnvDeployment,
  EnvironmentType,
} from "@jcloudify-api/typescript-client";
import {useMemo} from "react";
import {useGetList} from "react-admin";

export interface UseGetLastDeploymentParams {
  appId: string;
  envType: EnvironmentType;
}

export const useGetLatestDeployment = ({
  appId,
  envType,
}: UseGetLastDeploymentParams) => {
  const {data: deployments = [], isLoading} = useGetList<
    ToRecord<AppEnvDeployment>
  >("deployments", {
    filter: {
      appId,
      envType,
    },
  });

  const latestDeployment = useMemo(() => deployments[0], [deployments]);
  return {
    latestDeployment,
    isLoading,
  };
};
