import {Environment} from "@jcloudify-api/typescript-client";
import {Stack} from "@mui/material";
import {Add, CompareArrows} from "@mui/icons-material";
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
  useListContext,
} from "react-admin";
import {
  EnvironmentState,
  EnvironmentType,
  useEnvironmentCreation,
} from "@/operations/environments";

export type EnvironmentListProps<Record extends RaRecord<Identifier> = any> =
  Omit<ListProps<Record>, "resource" | "children"> & {
    appId: string;
  };

const ListActions: React.FC<{appId: string | undefined}> = ({appId}) => {
  const {canCreateMore} = useEnvironmentCreation(appId);
  const {data = []} = useListContext();
  return (
    <Stack py={1} direction="row" alignItems="center" spacing={2}>
      {!!data.length && (
        <Button
          to="diff"
          startIcon={<CompareArrows />}
          component={Link}
          variant="outlined"
          label="Diff"
        />
      )}

      <Button
        to="creation-template"
        startIcon={<Add />}
        component={Link}
        variant="contained"
        label="Create"
        disabled={!canCreateMore}
      />
    </Stack>
  );
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
      actions={<ListActions appId={application_id} />}
      queryOptions={{
        ...queryOptions,
        meta: {
          ...queryOptions.meta,
          application_id,
        },
      }}
      empty={false}
      {...rest}
    >
      <Datagrid rowClick={(id) => id.toString()}>
        <TextField source="id" />
        <FunctionField<Environment>
          label="Type"
          render={(env) => <EnvironmentType value={env.environment_type!} />}
        />
        <FunctionField<Environment>
          label="State"
          render={(env) => <EnvironmentState value={env.state!} />}
        />
      </Datagrid>
    </List>
  );
};
