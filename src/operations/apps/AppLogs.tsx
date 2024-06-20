import {useGetList} from "react-admin";
import {useParams} from "react-router-dom";
import {LogList} from "@/operations/logs";

export const AppLogs: React.FC = () => {
  const {appId} = useParams();

  const {data: envList = []} = useGetList("environments", {
    meta: {application_id: appId},
  });

  if (!envList.length) return;

  return <LogList envs={envList} />;
};
