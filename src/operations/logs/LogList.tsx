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
> & {
  envId: string;
};

export const LogList: React.FC<LogListProps> = ({
  envId: environment_id,
  queryOptions = {},
  ...rest
}) => {
  queryOptions.meta ||= {};

  return (
    <List
      resource="logs"
      queryOptions={{
        ...queryOptions,
        meta: {
          ...queryOptions.meta,
          environment_id,
        },
      }}
      {...rest}
    >
      <Datagrid>
        <TextField source="id" />
        <TextField label="Type" source="log_type" />
        <DateField label="Date" source="log_datetime" showTime />
        <UrlField label="File uri" source="log_file_uri" target="_blank" />
      </Datagrid>
    </List>
  );
};
