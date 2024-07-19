import {Environment} from "@jcloudify-api/typescript-client";
import {useState} from "react";
import {useGetList} from "react-admin";
import {Box, Paper, Stack, Select, MenuItem} from "@mui/material";

import {DiffViewer} from "@/components/diff";
import {Heading} from "@/components/head";

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
              environments={environments}
              onSelect={(id) => setDiffEnvironment(id, 0)}
            />
          }
          rightTitle={
            <SelectEnvironmentToCompare
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
  environments: Environment[];
  onSelect: (id: string) => void;
}> = ({environments, onSelect}) => (
  <Select<string> onChange={(ev) => onSelect(ev.target.value)} size="small">
    {environments.map((environment) => (
      <MenuItem key={environment.id} value={environment.id}>
        {environment.environment_type}
      </MenuItem>
    ))}
  </Select>
);
