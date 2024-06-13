import {useState} from "react";
import {useGetList} from "react-admin";
import {useParams, useSearchParams} from "react-router-dom";
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import {LogList, LogShow} from "@/operations/logs";
import {colors} from "@/themes";

export const AppLogList: React.FC = () => {
  const {appId} = useParams();

  const {data: envList = []} = useGetList("environments", {
    meta: {application_id: appId},
  });

  const [envId, setEnvId] = useState(envList.length ? envList[0].id : "");

  return (
    <Card component={Box} flex={1} height="100%">
      <CardHeader title="Logs" />
      <Divider sx={{borderColor: colors("gray-0")}} />
      <CardContent>
        <Stack direction="row" justifyContent="flex-end">
          <FormControl>
            <InputLabel id="env-select-label">Environment</InputLabel>
            <Select
              labelId="env-select-label"
              value={envId}
              label="Environment"
              onChange={(e) => setEnvId(e.target.value)}
              variant="outlined"
            >
              {envList.map(({id, environment_type}) => (
                <MenuItem value={id}>{environment_type}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
        <LogList exporter={false} envId={envId} pagination={false} title=" " />
      </CardContent>
    </Card>
  );
};

export const AppLogShow: React.FC = () => {
  const {logId} = useParams();
  const [p] = useSearchParams();

  return (
    <Box>
      <LogShow envId={p.get("envId")!} logId={logId!} />
    </Box>
  );
};
