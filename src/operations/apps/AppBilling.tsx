import {useParams} from "react-router-dom";
import {Box} from "@mui/material";
import {WithTab} from "@/components/tab";
import {BillingShow} from "@/operations/billing";

export const AppBilling: React.FC = () => {
  const {appId} = useParams();

  if (!appId) return null;

  return (
    <WithTab tab="Billing">
      <Box mt={4}>
        <BillingShow appId={appId} />
      </Box>
    </WithTab>
  );
};
