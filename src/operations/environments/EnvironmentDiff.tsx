import {Environment, OneOfPojaConf} from "@jcloudify-api/typescript-client";
import {useState} from "react";
import {useGetList, useGetOne} from "react-admin";
import {Box, Paper, Stack, Select, MenuItem} from "@mui/material";

import {DiffViewer} from "@/components/diff";
import {Heading} from "@/components/head";
import {EnvironmentType} from "@/operations/environments";

import {ToRecord} from "@/providers";
import {highlightJSON} from "@/config/prism";
import {prettyJSON} from "@/utils/format";
import {omit} from "@/utils/object";

export const EnvironmentDiff: React.FC<{appId: string}> = ({appId}) => {
  const [toCompare, setToCompare] = useState<string[]>([]);

  const {data: environments = []} = useGetList<ToRecord<Environment>>(
    "environments",
    {filter: {appId}}
  );

  const {data: c1} = useGetOne<ToRecord<OneOfPojaConf>>("pojaConf", {
    id: toCompare[0],
    meta: {
      appId,
    },
  });

  const {data: c2} = useGetOne<ToRecord<OneOfPojaConf>>("pojaConf", {
    id: toCompare[1],
    meta: {
      appId,
    },
  });

  const setDiffEnvironment = (selectedId: string, idx: number) => {
    toCompare[idx] = selectedId;
    setToCompare(toCompare.slice());
  };

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
            <SelectEnvironmentToCompare
              id="0"
              environments={environments}
              onSelect={(id) => setDiffEnvironment(id, 0)}
            />
          }
          rightTitle={
            <SelectEnvironmentToCompare
              id="1"
              environments={environments}
              onSelect={(id) => setDiffEnvironment(id, 1)}
            />
          }
          oldValue={c1 ? prettyJSON(omit(c1, "id" as any)) : ""}
          newValue={c2 ? prettyJSON(omit(c2, "id" as any)) : ""}
          highlight={highlightJSON}
        />
      </Box>
    </Stack>
  );
};

const SelectEnvironmentToCompare: React.FC<{
  id: string;
  environments: Environment[];
  onSelect: (id: string) => void;
}> = ({environments, onSelect, id}) => (
  <Select<string>
    onChange={(ev) => onSelect(ev.target.value)}
    size="small"
    data-testid={`select-env-${id}`}
  >
    {environments.map((environment) => (
      <MenuItem key={environment.id} value={environment.id}>
        <EnvironmentType value={environment.environment_type!} />
      </MenuItem>
    ))}
  </Select>
);
