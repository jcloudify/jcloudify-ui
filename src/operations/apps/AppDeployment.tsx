import {useParams} from "react-router-dom";
import {DeploymentList} from "@/operations/deployments";

export const AppDeployment: React.FC = () => {
  const {appId} = useParams();

  if (!appId) return;

  return <DeploymentList appId={appId} />;
};
