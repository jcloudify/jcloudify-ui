import {PojaVersion} from "@jcloudify-api/typescript-client";
import {useMemo, useEffect, useState} from "react";
import {useGetList} from "react-admin";
import {PojaConfComponent} from "@/operations/environments/poja-conf-form";
import {ToRecord} from "@/providers";

export const usePojaVersionState = (defaultSelected?: string) => {
  const {data: apiPojaVersions = [], isLoading} =
    useGetList<ToRecord<PojaVersion>>("pojaVersions");

  const pojaVersions = useMemo(
    () =>
      apiPojaVersions.map(
        (apiPojaVersion) => apiPojaVersion.human_readable_value!
      ),
    [apiPojaVersions]
  );

  const [pojaVersion, setPojaVersion] = useState(
    defaultSelected || pojaVersions[0]
  );

  useEffect(() => {
    setPojaVersion(defaultSelected || pojaVersions[0]);
  }, [defaultSelected, pojaVersions]);

  return {
    pojaVersion: pojaVersion as PojaConfComponent["version"],
    setPojaVersion,
    pojaVersions,
    isLoadingPojaVersions: isLoading,
  };
};
