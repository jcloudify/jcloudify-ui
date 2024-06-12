import {
  Datagrid,
  DateField,
  DateInput,
  Identifier,
  List,
  ListProps,
  RaRecord,
  SelectInput,
  TextField,
  UrlField,
} from "react-admin";
import {LogLogTypeEnum} from "@jcloudify-api/typescript-client";

export type LogListProps<Record extends RaRecord<Identifier> = any> = Omit<
  ListProps<Record>,
  "resource" | "children"
> & {
  envId: string;
};

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
      filters={logFilters}
      {...rest}
    >
      <Datagrid rowClick={(id) => `${environment_id}/${id}`}>
        <TextField source="id" />
        <TextField label="Type" source="log_type" />
        <DateField label="Date" source="log_datetime" showTime />
        <UrlField label="File uri" source="log_file_uri" target="_blank" />
      </Datagrid>
    </List>
  );
};
