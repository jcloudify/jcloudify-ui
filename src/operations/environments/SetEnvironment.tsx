import {useGetList, useRecordContext} from "react-admin";
import {Select, MenuItem, FormControl, InputLabel} from "@mui/material";
import {useSearchParams} from "react-router-dom";

export const SetEnvironment = () => {
  const [_, setEnv] = useSearchParams();

  const app = useRecordContext();
  const {data: envs = []} = useGetList("environments", {
    meta: {application_id: app?.id},
  });

  if (!app) return null;

  return (
    <FormControl variant="outlined" sx={{width: "15rem"}}>
      <InputLabel>Environment</InputLabel>
      <Select
        fullWidth
        size="small"
        label="environment"
        name="environment"
        defaultValue="Select environment"
        onChange={(ev) => {
          setEnv({env: ev.target.value as string});
        }}
      >
        <MenuItem value="Select environment">Select environment</MenuItem>
        {envs.map((env) => (
          <MenuItem value={env.id}>{env.environment_type}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
