import {useNavigate} from "react-router-dom";
import {Datagrid, FunctionField, ListBase, TextField} from "react-admin";
import {
  Box,
  Divider,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import {Settings as SettingsIcon} from "@mui/icons-material";
import {DisplayCard} from "@/operations/payment-methods";
import {colors} from "@/themes";

export const Payments: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4">Billing</Typography>
      <Divider />
      <Stack direction="column" spacing={2} my={2}>
        <PaymentsSummary />
        <Box my={1}>
          <Typography variant="h5">Payment List</Typography>
          <ListBase resource="payments">
            <Datagrid>
              <TextField source="ref" />
              <TextField source="date" />
              <FunctionField
                source="amount"
                label="Amount"
                render={(record: any) => `${record.amount} $`}
              />
              <TextField source="status" />
            </Datagrid>
          </ListBase>
        </Box>
      </Stack>
    </Box>
  );
};

const PaymentsSummary: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Box>
      <Typography variant="h5">Summary</Typography>
      <Stack
        direction={{sm: "column", md: "row"}}
        spacing={1}
        borderColor={colors("gray-0")}
        borderRadius={4}
        p={1}
        border={1}
        my={2}
        divider={<Divider />}
      >
        <Box sx={{my: 1, minWidth: "17rem"}}>
          <Stack direction="column" spacing={1} mb={1}>
            <Typography variant="h6">Current month</Typography>
            <Typography variant="h4">12.2$</Typography>
          </Stack>
        </Box>
        <Box>
          <Typography variant="h6">Usage summary</Typography>
          <Typography variant="body1">
            Labore aliquip esse esse proident excepteur. In excepteur nisi qui
            esse proident non. Nisi laborum deserunt aute excepteur eu eu duis
            excepteur.
          </Typography>
        </Box>
        <Box>
          <Stack
            direction="row"
            spacing={1}
            justifyContent="space-between"
            mb={1}
          >
            <Typography variant="h6">Payment Method</Typography>
            <Tooltip title="Manage Payment Methods">
              <IconButton
                aria-label="payment-method"
                size="small"
                onClick={() => {
                  navigate("/payments/payment-methods");
                }}
              >
                <SettingsIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Stack>
          <Box>
            <Typography variant="body2">Your default payment method</Typography>
            <DisplayCard last4="4242" />
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};
