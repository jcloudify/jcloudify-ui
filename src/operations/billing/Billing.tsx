import {IconButtonWithTooltip} from "react-admin";
import {useNavigate} from "react-router-dom";
import {Box, Card, CardContent, Stack, Typography} from "@mui/material";
import {Settings as SettingsIcon} from "@mui/icons-material";
import {ShowBillingInfo, ShowBillingInformationSummary} from "./";
import {authProvider} from "@/providers";

export const BillingSummary: React.FC = () => {
  const customerId = authProvider.getCachedWhoami()?.user?.stripe_id!;
  const navigate = useNavigate();
  return (
    <Card>
      <CardContent>
        <Stack direction="column" spacing={1}>
          <Stack direction="row" spacing={1} justifyContent="space-between">
            <Typography variant="h6">Payment Details Summary</Typography>
            <IconButtonWithTooltip
              label="Manage Payment Details"
              onClick={() => navigate(`/billing/payment-details`)}
            >
              <SettingsIcon fontSize="small" />
            </IconButtonWithTooltip>
          </Stack>
          <Stack
            direction={{sm: "column", md: "row"}}
            spacing={1}
            alignItems="stretch"
          >
            <Box sx={{width: "100%"}}>
              <ShowBillingInfo />
            </Box>
            <Box sx={{width: "100%"}}>
              <ShowBillingInformationSummary customerId={customerId} />
            </Box>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};
