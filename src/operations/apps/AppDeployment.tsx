import {useParams} from "react-router-dom";
import {DeploymentList, DeploymentShow} from "@/operations/deployments";
import {WithTab} from "@/components/tab";

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