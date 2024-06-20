import {useParams} from "react-router-dom";
import {MonitoringShow} from "../monitoring";

export const AppMonitoring: React.FC = () => {
  const {appId} = useParams();
  if (!appId) return;
  return <MonitoringShow appId={appId} />;
};
