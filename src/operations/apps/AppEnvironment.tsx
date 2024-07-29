import {useLocation, useParams} from "react-router-dom";
import {Box, Typography, Chip} from "@mui/material";
import {
  EnvironmentCreate,
  EnvironmentCreation,
  EnvironmentList,
  EnvironmentShow,
  EnvironmentDiff,
} from "@/operations/environments";
import {StackList, StackEventList} from "@/operations/stacks";
import {WithTab} from "@/components/tab";
import {Heading} from "@/components/head";
import {Pagination} from "@/operations/components/list";

export const AppEnvironmentList: React.FC = () => {
  const {appId} = useParams();
  if (!appId) return null;
  return (
    <WithTab tab="Environments">
      <Box mt={1.5}>
        <EnvironmentList
          exporter={false}
          appId={appId}
          title=" "
          pagination={false}
        />
      </Box>
    </WithTab>
  );
};

export const AppEnvironmentShow = () => {
  const {envId, appId} = useParams();

  if (!envId || !appId) return;

  return (
    <WithTab tab="Environments">
      <EnvironmentShow envId={envId} appId={appId} />
    </WithTab>
  );
};

export const AppEnvironmentCreation: React.FC = () => {
  const {appId} = useParams();
  if (!appId) return null;
  return (
    <WithTab tab="Environments">
      <EnvironmentCreation appId={appId} />
    </WithTab>
  );
};

export const AppEnvironmentCreate: React.FC = () => {
  const {appId} = useParams();

  const {state: template} = useLocation();

  if (!appId) return null;

  console.log("appId", appId);

  return (
    <WithTab tab="Environments">
      <EnvironmentCreate appId={appId} template={template} />
    </WithTab>
  );
};

export const AppEnvironmentDiff: React.FC = () => {
  const {appId} = useParams();
  if (!appId) return null;
  return (
    <WithTab tab="Environments">
      <EnvironmentDiff appId={appId} />
    </WithTab>
  );
};

export const AppEnvironmentStackList: React.FC = () => {
  const {appId} = useParams();
  if (!appId) return;
  return (
    <WithTab tab="Environments">
      <Box mt={3}>
        <Heading
          title="Stacks"
          subtitle="Overview of Environment Components"
          size="sm"
          p={1}
        />

        <StackList
          appId={appId}
          exporter={false}
          title=" "
          pagination={false}
        />
      </Box>
    </WithTab>
  );
};

export const AppEnvironmentStackEventList: React.FC = () => {
  const {appId, stackId} = useParams();
  if (!appId || !stackId) return;
  return (
    <WithTab tab="Environments">
      <Box mt={3}>
        <Heading
          title={
            <Typography variant="body1" fontWeight="400">
              <Chip size="small" label={stackId} color="primary" />
              &nbsp; &nbsp;
              <span>Stack Events</span>
            </Typography>
          }
          subtitle="List of events"
          size="sm"
          p={1}
        />

        <StackEventList
          appId={appId}
          actions={false}
          stackId={stackId}
          exporter={false}
          title=" "
          pagination={<Pagination />}
        />
      </Box>
    </WithTab>
  );
};
