import {Box, Card, CardContent, Stack, Typography} from "@mui/material";
import {ShowBillingInfo, ShowBillingInformationSummary} from "./";
import {authProvider} from "@/providers";

export const BillingSummary: React.FC = () => {
  const customerId = authProvider.getCachedWhoami()?.user?.stripe_id!;
  return (
    <Card>
      <CardContent>
        <Stack direction="column" spacing={1}>
          <Stack direction="row" spacing={1} justifyContent="space-between">
            <Typography variant="h6">Payment Details Summary</Typography>
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
