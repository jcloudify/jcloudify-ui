import {Title} from "react-admin";
import {Stack} from "@mui/material";
import {BillingInfoShow} from "@/operations/billing";

export const Billing: React.FC = () => (
  <Stack direction="column" spacing={1}>
    <Title title="Billing" />
    <BillingInfoShow />
  </Stack>
);
