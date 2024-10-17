import {useParams} from "react-router-dom";
import {WithTab} from "@/components/tab";
import {BillingShow} from "@/operations/billing";

export const AppBilling: React.FC = () => {
  const {appId} = useParams();

  if (!appId) return null;

  return (
    <WithTab tab="Billing">
      <BillingShow appId={appId} />
    </WithTab>
  );
};
