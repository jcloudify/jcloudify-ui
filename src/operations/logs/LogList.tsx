import {
  Datagrid,
  DateField,
  DateInput,
  ListBase,
  SelectInput,
  TextField,
  UrlField,
} from "react-admin";
import {Box} from "@mui/material";
import {Environment, LogLogTypeEnum} from "@jcloudify-api/typescript-client";

const logFilters = [
  <SelectInput
    alwaysOn
    label="Type"
    source="log_type"
    optionValue="name"
    choices={[
      {name: LogLogTypeEnum.APPLICATION_LOG},
      {name: LogLogTypeEnum.DEPLOYMENT_LOG},
    ]}
  />,
  <DateInput source="start_date_time" />,
  <DateInput source="end_date_time" />,
];

const LogListView: React.FC = () => {
  return (
    <Datagrid>
      <TextField source="id" />
      <TextField label="Type" source="log_type" />
      <DateField label="Date" source="log_datetime" showTime />
      <UrlField label="File uri" source="log_file_uri" target="_blank" />
    </Datagrid>
  );
};

export const LogList: React.FC<{envs: Environment[]}> = ({envs}) => {
  return (
    <ListBase
      resource="logs"
      queryOptions={{meta: {environment_id: envs[0].id}}}
    >
      <Box mt={1}>
        <LogListView />
      </Box>
    </ListBase>
  );
};
