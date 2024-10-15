import {Box, Stack} from "@mui/material";
import {ContainerWithHeading} from "@/components/container";
import {PaymentDetailsShow} from "@/operations/payments";
import {ShowBillingInfo} from "@/operations/billing";

export const Billing: React.FC = () => (
  <Stack direction="column" spacing={1}>
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
        <ShowBillingInfo />
      </Box>
      <Box sx={{width: "100%"}}>
        <PaymentDetailsShow />
      </Box>
    </Stack>
  </ContainerWithHeading>
);
