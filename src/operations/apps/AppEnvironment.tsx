import {Button} from "react-admin";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {Box, Stack, Typography} from "@mui/material";
import {Settings} from "@mui/icons-material";
import {
  EnvironmentCreate,
  EnvironmentCreation,
  EnvironmentList,
  EnvironmentShow,
  EnvironmentDiff,
} from "@/operations/environments";
import {StackList} from "@/operations/stacks";
import {LambdaFunctionsList} from "@/operations/lambda-functions";
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

export const AppLambdaFunctionsList: React.FC = () => {
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
                Lambda functions
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
          subtitle="List of compute stack resources per deployment"
          size="sm"
          p={1}
        />

        <LambdaFunctionsList
          appId={appId}
          exporter={false}
          title=" "
          pagination={<Pagination />}
        />
      </Box>
    </WithTab>
  );
};
