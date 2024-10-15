import {Stack} from "@mui/material";
import {BillingSummary} from "@/operations/billing";

export const Payments: React.FC = () => (
  <Stack direction="column" spacing={1}>
    <BillingSummary />
  </Stack>
);
