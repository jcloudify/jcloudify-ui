import {BillingShow} from "@/operations/billing";
import {WithTab} from "@/components/tab";

export const AppBilling: React.FC = () => (
  <WithTab tab="Billing">
    <BillingShow />
  </WithTab>
);
