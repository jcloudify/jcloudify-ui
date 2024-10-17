import {
  Application,
  Environment,
  EnvironmentType as EnvironmentTypeEnum
} from "@jcloudify-api/typescript-client";
import {useMemo} from "react";
import {
  Button,
  Datagrid,
  FunctionField,
  Identifier,
  Link,
  List,
  ListBase,
  ListProps,
  Loading,
  RaRecord,
  TextField,
  TopToolbar,
  WithListContext,
  useGetOne,
  useListContext,
} from "react-admin";
import {Typography, Box, Stack, Card, CardHeader, CardContent} from "@mui/material";
import {Add, CompareArrows, CloudOutlined} from "@mui/icons-material";
import {
  EnvironmentType,
  useEnvironmentCreation,
} from "@/operations/environments";
import {BulkDeleteButton} from "@/operations/components/list";
import {extactEnvironments} from "@/operations/environments/util";
import {ToRecord} from "@/providers";
import { GridLayout } from "@/components/grid";
import { typoSizes } from "@/components/typo";

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

export const _EnvironmentList: React.FC<EnvironmentListProps> = ({
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

const EnvironmentCard: React.FC<{environment: ToRecord<Environment>, app: ToRecord<Application>}> = ({environment, app}) => {
  return (
    <Card
      sx={{
        width: { xs: '100%', md: '45%' },
        height: 'auto',
        mb: { xs: 2, md: 0 },
        padding: 3,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <CardContent sx={{ textAlign: 'center', width: '100%' }}>
        {/* Icon and Environment Type */}
        <Stack direction="row" justifyContent="center" alignItems="center" spacing={1} sx={{ mb: 2 }}>
          <CloudOutlined sx={{ fontSize: '2rem' }} />
          <Typography variant="h4" component="div">
            {environment.environment_type}
          </Typography>
        </Stack>

      </CardContent>
    </Card>
  )
}

const EnvironmentListUI: React.FC<{app: ToRecord<Application>}> = ({app}) => {
  const {data: environments = []} = useListContext<ToRecord<Environment>>();

  const environment = useMemo(
    () => extactEnvironments(environments),
    [environments]
  );

  return (
    <Stack width="100%" height="100%" gap={2.5} flexDirection={{xs: "column", md: "row"}} justifyContent="space-evenly">
      {environment.PROD && (
        <EnvironmentCard
          environment={environment.PROD}
          app={app}
        />
      )}
      {environment.PREPROD && (
        <EnvironmentCard
          environment={environment.PREPROD}
          app={app}
        />
      )}
    </Stack>
  );
};

export const EnvironmentList: React.FC<EnvironmentListProps> = ({
  appId,
  queryOptions = {},
  ...rest
}) => {
  const {data: app, isLoading: isLoadingApp} = useGetOne<ToRecord<Application>>(
    "applications",
    {
      id: appId,
    }
  );

  return (
    <ListBase
      resource="environments"
      actions={<ListActions appId={appId} />}
      {...rest}
    >
      <TopToolbar>
        <ListActions appId={appId} />
      </TopToolbar>

      <WithListContext
        render={({isLoading: isLoading}) =>
          isLoading || isLoadingApp ? (
            <Loading loadingPrimary="" loadingSecondary="" />
          ) : (
            <EnvironmentListUI app={app!} />
          )
        }
      />
    </ListBase>
  );
};
