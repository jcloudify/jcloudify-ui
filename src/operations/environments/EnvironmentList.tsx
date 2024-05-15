import {
  Datagrid,
  Identifier,
  List,
  ListProps,
  RaRecord,
  TextField,
} from "react-admin";

export type EnvironmentListProps<Record extends RaRecord<Identifier> = any> =
  Omit<ListProps<Record>, "resource" | "children"> & {
    appId: string;
  };

export const EnvironmentList: React.FC<EnvironmentListProps> = ({
  appId: application_id,
  queryOptions = {},
  ...rest
}) => {
  queryOptions.meta ||= {};
  return (
    <List
      resource="environments"
      queryOptions={{
        ...queryOptions,
        meta: {
          ...queryOptions.meta,
          application_id,
        },
      }}
      {...rest}
    >
      <Datagrid>
        <TextField source="id" />
        <TextField label="Type" source="environment_type" />
      </Datagrid>
    </List>
  );
};
