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
} from "react-admin";
import {
  EnvironmentType,
  useEnvironmentCreation,
} from "@/operations/environments";
import {BulkDeleteButton} from "@/operations/components/list";

export type EnvironmentListProps<Record extends RaRecord<Identifier> = any> =
  Omit<ListProps<Record>, "resource" | "children"> & {
    appId: string;
  };

const ListActions: React.FC<{appId: string | undefined}> = ({appId}) => {
  const {canCreateMore, created} = useEnvironmentCreation(appId);
  return (
    <Stack py={1} direction="row" alignItems="center" spacing={2}>
      <Button
        to="diff"
        startIcon={<CompareArrows />}
        component={Link}
        variant="outlined"
        disabled={created.length !== 2}
        label="Diff"
      />

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
  appId,
  queryOptions = {},
  ...rest
}) => {
  queryOptions.meta ||= {};

  return (
    <List
      resource="environments"
      actions={<ListActions appId={appId} />}
      {...rest}
    >
      <Datagrid
        rowClick={(id) => id.toString()}
        bulkActionButtons={
          <BulkDeleteButton mutationOptions={{meta: {appId}}} />
        }
      >
        <TextField source="id" />
        <FunctionField<Environment>
          label="Type"
          render={(env) => <EnvironmentType value={env.environment_type!} />}
        />
      </Datagrid>
    </List>
  );
};
