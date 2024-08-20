import {IconButtonWithTooltip} from "react-admin";
import {useNavigate} from "react-router-dom";
import {Box, Stack, Typography} from "@mui/material";
import {Settings as SettingsIcon} from "@mui/icons-material";
import {BillingInformation} from "./BillingDetails";

export const PaymentDetails: React.FC = () => {
  return (
    <Box>
      <BillingInformation />
    </Box>
  );
};

export const PaymentDetailsSummary: React.FC = () => {
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
        <Typography variant="body1">Name of customer</Typography>
        <Typography variant="body1">Email of customer</Typography>
        <Typography variant="body1">Phone of customer</Typography>
      </Stack>
    </Stack>
  );
};
