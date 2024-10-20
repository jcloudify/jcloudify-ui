import {useLocation, useParams} from "react-router-dom";
import {Box} from "@mui/material";
import {
  EnvironmentCreate,
  EnvironmentCreation,
  EnvironmentShow,
  EnvironmentDiff,
  EnvironmentsShow,
} from "@/operations/environments";
import {StackList} from "@/operations/stacks";
import {LambdaFunctionsList} from "@/operations/lambda-functions";
import {WithTab} from "@/components/tab";
import {Heading} from "@/components/head";
import {Pagination} from "@/operations/components/list";

export const AppEnvironmentsShow: React.FC = () => {
  const {appId} = useParams();
  if (!appId) return null;
  return (
    <WithTab tab="Environments">
      <Box mt={1.5}>
        <EnvironmentsShow appId={appId} />
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
    <WithTab tab="Deployments">
      <Box mt={3}>
        <Heading
          title="Deployment stacks"
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
  if (!appId) return;
  return (
    <WithTab tab="Logs">
      <Box mt={3}>
        <Heading
          title="Lambda functions"
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
