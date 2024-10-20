import {
  Application,
  Environment,
  OneOfPojaConf,
} from "@jcloudify-api/typescript-client";
import {useCreate, useGetOne} from "react-admin";
import {MutateOptions} from "@tanstack/react-query";
import {nanoid} from "nanoid";
import {PojaConfComponentVersion} from "@/operations/environments/poja-conf-form";
import {getPojaVersionedComponent} from "@/operations/environments/poja-conf-form/poja-conf-record";
import {ToRecord} from "@/providers";
import {optional} from "@/utils/monad";

export interface CreateEnvironmentWithConfigParams {
  environment: Environment;
  config: OneOfPojaConf;
}

export type UseCreateEnvironmentWithConfigResult = [
  (
    params: CreateEnvironmentWithConfigParams,
    options?: MutateOptions<any, any, unknown>
  ) => Promise<void>,
  {isLoading: boolean},
];

export const useCreateEnvironmentWithConfig = (
  targetAppId: string
): UseCreateEnvironmentWithConfigResult => {
  const {data: targetApp, isLoading: isLoadingApp} = useGetOne<
    ToRecord<Application>
  >("applications", {
    id: targetAppId,
  });

  const [create, {isLoading: isCreatingEnvironment}] = useCreate();

  const createEnvironmentWithConfig = async (
    params: CreateEnvironmentWithConfigParams,
    options?: MutateOptions<any, any, unknown>
  ) => {
    const newEnvironmentId = nanoid();
    const pcc = getPojaVersionedComponent(
      params.config.version as PojaConfComponentVersion
    );

    if (!pcc) {
      optional(options?.onError).call(
        {
          message: `jcloudify config version=${params.config.version} is unavailable.`,
        },
        {},
        undefined
      );
      return;
    }

    await create(
      "environments",
      {
        meta: {
          appId: targetAppId,
          ownerId: newEnvironmentId,
        },
        data: pcc.formTransformFormValues(
          {
            to_create: {
              ...params.environment,
              id: newEnvironmentId,
            },
            ...(params.config || pcc.formDefaultValues),
          },
          targetApp!
        ),
      },
      options
    );
  };

  return [
    createEnvironmentWithConfig,
    {isLoading: isLoadingApp || isCreatingEnvironment},
  ];
};
