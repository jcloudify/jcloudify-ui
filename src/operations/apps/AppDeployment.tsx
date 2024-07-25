import {useParams} from "react-router-dom";
import {Box} from "@mui/material";
import {WithTab} from "@/components/tab";
import {DeploymentList, DeploymentShow} from "@/operations/deployments";
import {StackList, StackEventList} from "@/operations/stacks";

export const AppDeploymentList: React.FC = () => {
  const {appId} = useParams();
  if (!appId) return;
  return <DeploymentList appId={appId} />;
};

export const AppDeploymentShow: React.FC = () => {
  const {deplId} = useParams();

  if (!deplId) return;

  return (
    <WithTab tab="Deployments">
      <DeploymentShow deplId={deplId} />
    </WithTab>
  );
};

export const AppDeploymentStackList: React.FC = () => {
  const {appId} = useParams();
  if (!appId) return;
  return (
    <WithTab tab="Deployments">
      <Box mt={1.5}>
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

export const AppDeploymentStackEventList: React.FC = () => {
  const {appId, stackId} = useParams();
  if (!appId || !stackId) return;
  return (
    <WithTab tab="Deployments">
      <Box mt={1.5}>
        <StackEventList
          appId={appId}
          stackId={stackId}
          exporter={false}
          title=" "
          pagination={false}
        />
      </Box>
    </WithTab>
  );
};
