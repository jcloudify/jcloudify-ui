import {
  Environment,
  OneOfPojaConf,
  EnvironmentType as EnvironmentTypeEnum,
} from "@jcloudify-api/typescript-client";
import {useMemo} from "react";
import {useGetList, useGetOne} from "react-admin";
import {Box, Paper, Stack} from "@mui/material";

import {DiffViewer} from "@/components/diff";
import {Heading} from "@/components/head";
import {EnvironmentType} from "@/operations/environments";

import {ToRecord} from "@/providers";
import {highlightJSON} from "@/config/prism";
import {prettyJSON} from "@/utils/format";
import {omit} from "@/utils/object";

export const EnvironmentDiff: React.FC<{appId: string}> = ({appId}) => {
  const {data: environments = []} = useGetList<ToRecord<Environment>>(
    "environments",
    {filter: {appId}}
  );

  const environmentMap = useMemo(() => {
    return {
      prod: environments.find(
        (env) => env.environment_type! === EnvironmentTypeEnum.PROD
      ),
      preprod: environments.find(
        (env) => env.environment_type! === EnvironmentTypeEnum.PREPROD
      ),
    };
  }, [environments]);

  const {data: c1} = useGetOne<ToRecord<OneOfPojaConf>>("pojaConf", {
    id: environmentMap.prod?.id!,
    meta: {
      appId,
      targetResource: "environment",
    },
  });

  const {data: c2} = useGetOne<ToRecord<OneOfPojaConf>>("pojaConf", {
    id: environmentMap.preprod?.id!,
    meta: {
      appId,
      targetResource: "environment",
    },
  });

  return (
    <Stack mt={4} mb={3} spacing={3}>
      <Heading
        title="Environment Diff"
        subtitle="Compare Environment Differences"
        p={2}
        size="sm"
      />

      <Box component={Paper} bgcolor="#fff">
        <DiffViewer
          leftTitle={
            environmentMap.prod ? (
              <EnvironmentType value={EnvironmentTypeEnum.PROD} />
            ) : undefined
          }
          rightTitle={
            environmentMap.preprod ? (
              <EnvironmentType value={EnvironmentTypeEnum.PREPROD} />
            ) : undefined
          }
          oldValue={c1 ? prettyJSON(omit(c1, "id" as any)) : ""}
          newValue={c2 ? prettyJSON(omit(c2, "id" as any)) : ""}
          highlight={highlightJSON}
        />
      </Box>
    </Stack>
  );
};
