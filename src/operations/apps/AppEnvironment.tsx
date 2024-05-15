import {useParams} from "react-router-dom";
import {EnvironmentList} from "../environments";

export const AppEnvironment: React.FC = () => {
  const {appId} = useParams();
  if (!appId) return null;
  return <EnvironmentList appId={appId} title=" " pagination={false} />;
};
