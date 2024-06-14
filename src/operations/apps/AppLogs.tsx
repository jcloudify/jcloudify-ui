import {useParams, useSearchParams} from "react-router-dom";
import {LogList, LogShow} from "@/operations/logs";
import {WithTab} from "@/components/tab";

export const AppLogList: React.FC = () => {
  return <LogList exporter={false} pagination={false} title=" " />;
};

export const AppLogShow: React.FC = () => {
  const {logId} = useParams();
  const [p] = useSearchParams();
  const envId = p.get("envId");

  if (!logId || !envId) return;

  return (
    <WithTab tab="Logs">
      <LogShow envId={envId} logId={logId} />
    </WithTab>
  );
};
