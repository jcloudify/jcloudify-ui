import {
  Datagrid,
  Identifier,
  List,
  ListProps,
  RaRecord,
  TextField,
} from "react-admin";

export type EnvironmentVariablesEditProps<
  Record extends RaRecord<Identifier> = any,
> = Omit<ListProps<Record>, "resource" | "queryOptions" | "children"> & {
  envId: string;
};

// TODO: edit env
export const EnvironmentVariablesEdit: React.FC<
  EnvironmentVariablesEditProps
> = ({envId: env_id, ...rest}) => {
  return (
    <List
      resource="env_variables"
      queryOptions={{
        meta: {
          env_id,
        },
      }}
      {...rest}
    >
      <Datagrid>
        <TextField source="name" />
        <TextField source="value" />
      </Datagrid>
    </List>
  );
};
