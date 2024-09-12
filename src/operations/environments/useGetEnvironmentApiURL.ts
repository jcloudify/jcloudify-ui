import {Stack, StackOutput, StackType} from "@jcloudify-api/typescript-client";
import {useMemo} from "react";
import {useGetList} from "react-admin";
import {ToRecord} from "@/providers";

export interface UseGetEnvironmentApiURLParams {
  appId: string;
  envId: string;
}

export const useGetEnvironmentApiURL = ({
  appId,
  envId,
}: UseGetEnvironmentApiURLParams) => {
  const {data: stacks = [], isLoading: isLoadingStacks} = useGetList<
    ToRecord<Stack>
  >("stacks", {
    filter: {
      appId,
      env_id: envId,
    },
  });

  const computeStack = useMemo(
    () => stacks.find((stack) => stack.stack_type === StackType.COMPUTE),
    [stacks]
  );

  const {data: outputs = [], isLoading: isLoadingOutputs} = useGetList<
    ToRecord<StackOutput>
  >("stackOutputs", {
    filter: {
      appId,
      env_id: envId,
      stack_id: computeStack?.id,
    },
  });

  const apiUrl = useMemo(
    () => outputs.find((output) => output.key === "ApiUrl"),
    [outputs]
  );

  const isLoadingApiURL = isLoadingStacks || isLoadingOutputs;

  return {
    apiUrl,
    isLoadingApiURL,
    isUnavailable: !isLoadingApiURL && !apiUrl,
  };
};
