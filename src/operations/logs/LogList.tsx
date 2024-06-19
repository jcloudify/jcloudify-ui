import {
  Datagrid,
  DateField,
  DateInput,
  Filter,
  ListBase,
  ListToolbar as RAListToolbar,
  SelectInput,
  TextField,
  UrlField,
  required,
} from "react-admin";
import {Box, Stack, styled} from "@mui/material";
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

const ListToolbar = styled(RAListToolbar)({
  "display": "block",
  "& .RaFilter-form .filter-field": {
    width: "100%",
  },
});

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

const LogListFilter: React.FC<{alwaysOn?: boolean; envs: Environment[]}> = ({
  envs,
}) => {
  return (
    <Stack direction="column" alignItems="flex-end" spacing={2} width="100%">
      <SelectInput
        alwaysOn
        label="Environmnet"
        validate={required()}
        source="environment_id"
        optionValue="id"
        optionText="environment_type"
        choices={envs}
      />
    </Stack>
  );
};

export const LogList: React.FC<{envs: Environment[]}> = ({envs}) => {
  return (
    <ListBase
      resource="logs"
      queryOptions={{meta: {environment_id: envs[0].id}}}
      filterDefaultValues={{environment_id: envs[0].id}}
    >
      <Box mt={1}>
        <ListToolbar
          title=" "
          filters={
            <Filter>
              <LogListFilter alwaysOn envs={envs} />
            </Filter>
          }
        />
      </Box>
      <LogListView />
    </ListBase>
  );
};
