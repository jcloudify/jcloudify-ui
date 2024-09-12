import {useParams} from "react-router-dom";
import {WithTab} from "@/components/tab";
import {DeploymentList, DeploymentShow} from "@/operations/deployments";

export const AppDeploymentList: React.FC = () => {
  const {appId} = useParams();
  if (!appId) return;
  return (
    <WithTab tab="Deployments">
      <DeploymentList appId={appId} />
    </WithTab>
  );
};

export const AppDeploymentShow: React.FC = () => {
  const {appId, deplId} = useParams();

  if (!appId || !deplId) return;

  return (
    <WithTab tab="Deployments">
      <DeploymentShow deplId={deplId} />
    </WithTab>
  );
};
