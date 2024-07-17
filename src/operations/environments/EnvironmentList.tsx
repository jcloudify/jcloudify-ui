import {Environment} from "@jcloudify-api/typescript-client";
import {Stack} from "@mui/material";
import {Add} from "@mui/icons-material";
import {
  Button,
  Datagrid,
  FunctionField,
  Identifier,
  Link,
  List,
  ListProps,
  RaRecord,
  TextField,
} from "react-admin";
import {EnvironmentState} from "@/operations/environments";

export type EnvironmentListProps<Record extends RaRecord<Identifier> = any> =
  Omit<ListProps<Record>, "resource" | "children"> & {
    appId: string;
  };

const ListActions = () => (
  <Stack py={1}>
    <Button
      to="creation-template"
      startIcon={<Add />}
      component={Link}
      variant="contained"
      label="Create"
    />
  </Stack>
);

export const EnvironmentList: React.FC<EnvironmentListProps> = ({
  appId: application_id,
  queryOptions = {},
  ...rest
}) => {
  queryOptions.meta ||= {};

  return (
    <List
      resource="environments"
      actions={<ListActions />}
      queryOptions={{
        ...queryOptions,
        meta: {
          ...queryOptions.meta,
          application_id,
        },
      }}
      {...rest}
    >
      <Datagrid rowClick={(id) => id.toString()}>
        <TextField source="id" />
        <TextField label="Type" source="environment_type" />
        <FunctionField<Environment>
          label="State"
          render={(env) => <EnvironmentState value={env.state!} />}
        />
      </Datagrid>
    </List>
  );
};
