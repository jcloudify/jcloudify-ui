import {Box, Stack} from "@mui/material";
import {ContainerWithHeading} from "@/components/container";
import {PaymentDetailsShow} from "@/operations/payments";
import {BillingInfoShow} from "@/operations/billing";
import {BetaTest} from "@/operations/components/beta-test";

export const Billing: React.FC = () => (
  <Stack direction="column" spacing={1}>
    <BetaTest />
    <BillingSummary />
  </Stack>
);

const BillingSummary: React.FC = () => (
  <ContainerWithHeading title="Payment Details Summary">
    <Stack
      direction={{sm: "column", md: "row"}}
      spacing={1}
      alignItems="stretch"
    >
      <Box sx={{width: "100%"}}>
        <BillingInfoShow />
      </Box>
      <Box sx={{width: "100%"}}>
        <PaymentDetailsShow />
      </Box>
    </Stack>
  </ContainerWithHeading>
);
