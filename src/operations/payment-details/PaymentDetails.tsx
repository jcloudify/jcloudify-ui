import {IconButtonWithTooltip} from "react-admin";
import {useNavigate} from "react-router-dom";
import {Box, Stack, Typography} from "@mui/material";
import {Settings as SettingsIcon} from "@mui/icons-material";
import {authProvider} from "@/providers";
import {BillingDetailsSummary, BillingInformation} from "./BillingDetails";

export const PaymentDetails: React.FC = () => {
  return (
    <Box>
      <BillingInformation />
    </Box>
  );
};

export const PaymentDetailsSummary: React.FC = () => {
  const customerId = authProvider.getCachedWhoami()?.user?.stripe_id!;
  const navigate = useNavigate();

  return (
    <Stack direction="column" spacing={1}>
      <Stack direction="row" spacing={1} justifyContent="space-between">
        <Typography variant="h6">Payment details</Typography>
        <IconButtonWithTooltip
          label="Manage Payment Details"
          onClick={() => navigate(`/billing/payment-details`)}
        >
          <SettingsIcon fontSize="small" />
        </IconButtonWithTooltip>
      </Stack>
      <Stack direction="column" spacing={1}>
        <BillingDetailsSummary customerId={customerId} />
      </Stack>
    </Stack>
  );
};
