import {
  Datagrid,
  DateField,
  Identifier,
  List,
  ListProps,
  RaRecord,
  TextField,
  UrlField,
} from "react-admin";

export type LogListProps<Record extends RaRecord<Identifier> = any> = Omit<
  ListProps<Record>,
  "resource" | "children"
>;

export const LogList: React.FC<LogListProps> = ({...rest}) => {
  const environment_id = "prod_env";
  return (
    <List
      resource="logs"
      queryOptions={{
        meta: {
          environment_id,
        },
      }}
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
