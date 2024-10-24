import {useParams} from "react-router-dom";
import {WithTab} from "@/components/tab";
import {BillingShow} from "@/operations/billing";
import {BetaTest} from "@/operations/components/beta-test";

export const AppBilling: React.FC = () => {
  const {appId} = useParams();

  if (!appId) return null;

  return (
    <WithTab tab="Billing">
      <BetaTest />
      <BillingShow appId={appId} />
    </WithTab>
  );
};
