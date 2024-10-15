import {Box, Stack} from "@mui/material";
import {ContainerWithHeading} from "@/components/container";
import {PaymentDeatilsShow} from "@/operations/payments";
import {ShowBillingInfo} from "./";

export const Billing: React.FC = () => (
  <Stack direction="column" spacing={1}>
    <BillingSummary />
  </Stack>
);

export const BillingSummary: React.FC = () => (
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
        <PaymentDeatilsShow />
      </Box>
    </Stack>
  </ContainerWithHeading>
);
