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
  maxValue,
  required,
  useGetList,
  useListFilterContext,
} from "react-admin";
import {Box, Stack, styled} from "@mui/material";
import {Environment, LogLogTypeEnum} from "@jcloudify-api/typescript-client";
import {Pagination} from "@/operations/components/list";
import {GridLayout} from "@/components/grid";
import {Dict} from "@/providers";
import {EnvironmentType} from "../environments";

const ListToolbar = styled(RAListToolbar)({
  "display": "block",
  "& .RaFilter-form .filter-field": {
    width: "100%",
  },
});

// TODO: make util for date range inputs
const from = (v: Date, filterValues: Dict<any>) => {
  if (!v || !filterValues.to || v <= filterValues.to) {
    return undefined;
  }
  return " ";
};

const to = (v: Date, filterValues: Dict<any>) => {
  if (!v || !filterValues.from || v >= filterValues.from) {
    return undefined;
  }
  return " ";
};

const LogListView: React.FC = () => {
  const {filterValues} = useListFilterContext();
  return (
    <Datagrid rowClick={(id) => `${id}?envId=${filterValues?.environment_id}`}>
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
        label="Environments"
        validate={required()}
        source="environment_id"
        choices={envs}
        optionText={(option) => (
          <EnvironmentType value={option.environment_type!} />
        )}
        optionValue="id"
        variant="outlined"
      />
      <GridLayout xs={6} md={4} lg={3} columnSpacing={2}>
        <SelectInput
          alwaysOn
          label="Type"
          source="type"
          optionValue="name"
          fullWidth
          variant="outlined"
          choices={[
            {name: LogLogTypeEnum.APPLICATION_LOG},
            {name: LogLogTypeEnum.DEPLOYMENT_LOG},
          ]}
        />
        <DateInput
          source="from"
          validate={[from, maxValue(new Date())]}
          fullWidth
          variant="outlined"
        />
        <DateInput source="to" validate={to} fullWidth variant="outlined" />
      </GridLayout>
    </Stack>
  );
};

export const LogList: React.FC<{appId: string}> = ({appId}) => {
  const {data: environments = []} = useGetList("environments", {
    filter: {appId},
  });

  return (
    <ListBase
      resource="logs"
      queryOptions={{meta: {environment_id: environments[0]?.id}}}
      filterDefaultValues={{environment_id: environments[0]?.id}}
    >
      <Box mt={1}>
        <ListToolbar
          title=" "
          filters={
            <Filter>
              <LogListFilter alwaysOn envs={environments} />
            </Filter>
          }
        />
      </Box>
      <LogListView />
      <Box mt={2}>
        <Pagination />
      </Box>
    </ListBase>
  );
};
