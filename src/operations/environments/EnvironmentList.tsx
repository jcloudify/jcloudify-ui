import {
  Datagrid,
  Identifier,
  List,
  ListProps,
  RaRecord,
  RowClickFunction,
  TextField,
} from "react-admin";
import {useSearchParams} from "react-router-dom";

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

  const [_, setSearch] = useSearchParams();

  const queryEnv: RowClickFunction = (_id, _resource, env) => {
    setSearch({env: env.id.toString()});
    return false;
  };

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
      <Datagrid rowClick={queryEnv}>
        <TextField source="id" />
        <TextField label="Type" source="environment_type" />
      </Datagrid>
    </List>
  );
};
