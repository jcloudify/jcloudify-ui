import {
  Datagrid,
  DateField,
  Filter,
  Identifier,
  List,
  ListProps,
  RaRecord,
  SelectInput,
  TextField,
  UrlField,
  required,
  useGetList,
} from "react-admin";
import {Stack} from "@mui/material";
import {Environment} from "@jcloudify-api/typescript-client";
import {useParams} from "react-router-dom";

export type LogListProps<Record extends RaRecord<Identifier> = any> = Omit<
  ListProps<Record>,
  "resource" | "children"
>;

const LogListFilter: React.FC<{envs: Environment[]}> = ({envs}) => {
  return (
    <Stack direction="column" spacing={3} alignItems="flex-end">
      <Filter>
        <SelectInput
          alwaysOn
          source="environment_id"
          validate={required()}
          choices={envs}
          label="Environment"
          optionValue="id"
          optionText="environment_type"
        />
      </Filter>
    </Stack>
  );
};

export const LogList: React.FC<LogListProps> = ({...rest}) => {
  const environment_id = "prod_env";
  const {appId} = useParams();
  const {data: envs = []} = useGetList("environments", {
    meta: {application_id: appId},
  });

  if (!envs.length) return;

  return (
    <List
      resource="logs"
      actions={<LogListFilter envs={envs} />}
      filterDefaultValues={{environment_id: envs[0].id}}
      {...rest}
    >
      <Datagrid rowClick={(id) => `${id}?envId=${environment_id}`}>
        <TextField source="id" />
        <TextField label="Type" source="log_type" />
        <DateField label="Date" source="log_datetime" showTime />
        <UrlField label="File uri" source="log_file_uri" target="_blank" />
      </Datagrid>
    </List>
  );
};
