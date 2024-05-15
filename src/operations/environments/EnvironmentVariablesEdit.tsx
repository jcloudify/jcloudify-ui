import {Datagrid, List, TextField} from "react-admin";

export interface EnvironmentVariablesEditProps {
  envId: string;
}

export const EnvironmentVariablesEdit: React.FC<
  EnvironmentVariablesEditProps
> = ({envId: env_id}) => {
  return (
    <List
      title=" "
      resource="env_variables"
      queryOptions={{
        meta: {
          env_id,
        },
      }}
    >
      <Datagrid>
        <TextField source="name" />
        <TextField source="value" />
      </Datagrid>
    </List>
  );
};
