import {Application} from "@jcloudify-api/typescript-client";
import {useState} from "react";
import {useGetOne} from "react-admin";
import {ToRecord} from "@/providers";

export interface UseCheckAppIsPushedParams {
  appId: string;
  enabled: boolean;
}

export const useCheckAppIsPushed = ({
  appId,
  enabled,
}: UseCheckAppIsPushedParams) => {
  const [shouldCheck, setShouldCheck] = useState(true);
  useGetOne<ToRecord<Application>>(
    "applications",
    {
      id: appId,
    },
    {
      refetchInterval: 5 * 1000,
      enabled: shouldCheck && enabled,
      onSuccess: (app) => {
        setShouldCheck(!app.repositoryUrl);
      },
    }
  );
  return !shouldCheck;
};
