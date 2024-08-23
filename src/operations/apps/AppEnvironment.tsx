import {Button} from "react-admin";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {Box, Stack, Typography} from "@mui/material";
import {FaCubesStacked as StackIcon} from "react-icons/fa6";
import {Settings} from "@mui/icons-material";
import {
  EnvironmentCreate,
  EnvironmentCreation,
  EnvironmentList,
  EnvironmentShow,
  EnvironmentDiff,
} from "@/operations/environments";
import {
  StackList,
  StackEventList,
  StackOutputList,
  StackId,
} from "@/operations/stacks";
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
          empty={false}
          pagination={false}
          filter={{
            appId,
          }}
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
  const to = useNavigate();
  if (!appId) return;
  return (
    <WithTab tab="Environments">
      <Box mt={3}>
        <Heading
          title={
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              spacing={2}
            >
              <Typography variant="h6" fontWeight="450">
                Stacks
              </Typography>
              <Box>
                <Button
                  variant="outlined"
                  startIcon={<Settings />}
                  label="Environments"
                  onClick={() => to(`/applications/${appId}/show/environments`)}
                />
              </Box>
            </Stack>
          }
          subtitle="List of environment components"
          size="sm"
          p={1}
        />

        <StackList
          appId={appId}
          exporter={false}
          title=" "
          pagination={<Pagination />}
        />
      </Box>
    </WithTab>
  );
};

export const AppEnvironmentStackEventList: React.FC = () => {
  const {appId, stackId, envId} = useParams();
  const to = useNavigate();
  if (!appId || !stackId || !envId) return;
  return (
    <WithTab tab="Environments">
      <Box mt={3}>
        <Heading
          title={
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              spacing={2}
            >
              <StackId appId={appId} stackId={stackId} envId={envId} />
              <Box>
                <Button
                  variant="outlined"
                  startIcon={<StackIcon />}
                  label="Stacks"
                  onClick={() =>
                    to(`/applications/${appId}/show/environments/stacks`)
                  }
                />
              </Box>
            </Stack>
          }
          subtitle="List of events"
          size="sm"
          p={1}
        />

        <StackEventList
          appId={appId}
          stackId={stackId}
          envId={envId}
          actions={false}
          exporter={false}
          title=" "
          pagination={<Pagination />}
        />
      </Box>
    </WithTab>
  );
};

export const AppEnvironmentStackOutputList: React.FC = () => {
  const {appId, stackId, envId} = useParams();
  const to = useNavigate();
  if (!appId || !stackId || !envId) return;
  return (
    <WithTab tab="Environments">
      <Box mt={3} width="100%">
        <Heading
          title={
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              spacing={2}
            >
              <StackId appId={appId} stackId={stackId} envId={envId} />
              <Box>
                <Button
                  variant="outlined"
                  startIcon={<StackIcon />}
                  label="Stacks"
                  onClick={() =>
                    to(`/applications/${appId}/show/environments/stacks`)
                  }
                />
              </Box>
            </Stack>
          }
          subtitle="List of outputs"
          size="sm"
          p={1}
        />

        <StackOutputList
          appId={appId}
          stackId={stackId}
          envId={envId}
          actions={false}
          exporter={false}
          title=" "
          pagination={<Pagination />}
        />
      </Box>
    </WithTab>
  );
};
