import {Datagrid, FunctionField, ListBase, TextField} from "react-admin";
import {Box, Divider, Stack, Typography} from "@mui/material";
import {PaymentMethodSummary} from "@/operations/payment-methods";
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
  return (
    <Box>
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
        <PaymentMethodSummary />
      </Stack>
    </Box>
  );
};
