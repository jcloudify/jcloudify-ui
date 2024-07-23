import {Environment} from "@jcloudify-api/typescript-client";
import {useState} from "react";
import {useGetList} from "react-admin";
import {Box, Paper, Stack, Select, MenuItem} from "@mui/material";

import {DiffViewer} from "@/components/diff";
import {Heading} from "@/components/head";
import {EnvironmentType} from "@/operations/environments";

import {ToRecord} from "@/providers";
import {highlightJSON} from "@/config/prism";
import {prettyJSON} from "@/utils/format";

export const EnvironmentDiff: React.FC<{appId: string}> = ({appId}) => {
  const [toCompare, setToCompare] = useState<Environment[]>([]);

  const {data: environments = []} = useGetList<ToRecord<Environment>>(
    "environments",
    {meta: {application_id: appId}}
  );

  const setDiffEnvironment = (selectedId: string, toCompareIdx: number) => {
    toCompare[toCompareIdx] = environments.find(
      (environment) => environment.id === selectedId
    )!;
    setToCompare(toCompare.slice());
  };

  const [c1, c2] = toCompare;

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
          oldValue={c1 ? prettyJSON(c1) : ""}
          newValue={c2 ? prettyJSON(c2) : ""}
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
    id={`select-env-${id}`}
  >
    {environments.map((environment) => (
      <MenuItem key={environment.id} value={environment.id}>
        <EnvironmentType value={environment.environment_type!} />
      </MenuItem>
    ))}
  </Select>
);
