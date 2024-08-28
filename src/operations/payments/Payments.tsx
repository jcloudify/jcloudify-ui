import {Datagrid, DateField, FunctionField, List, TextField} from "react-admin";
import {Box, Divider, Stack, Typography} from "@mui/material";
import {printMoney} from "@/operations/utils/print-money";
import {colors} from "@/themes";
import {PaymentDetailsSummary} from "./";

export const Payments: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4">Billing</Typography>
      <Divider />
      <PaymentSummary />
      <PaymentList />
    </Box>
  );
};

const PaymentSummary: React.FC = () => {
  return (
    <Box
      my={1}
      sx={{bgcolor: colors("light"), borderRadius: 2, p: 1, border: 1}}
    >
      <Stack direction={{md: "row", sm: "column"}} spacing={1} my={1}>
        <Box width="100%">
          <Stack direction="row" spacing={1} justifyContent="space-between">
            <Typography variant="h6">Current Month</Typography>
          </Stack>
          <Stack direction="column" spacing={1}>
            <Typography variant="h4">$ 32.72</Typography>
          </Stack>
        </Box>
        <Box width="100%">
          <PaymentDetailsSummary />
        </Box>
      </Stack>
    </Box>
  );
};

const PaymentList: React.FC = () => {
  return (
    <Box my={1}>
      <Typography variant="h5">Payment List</Typography>
      <List resource="payments" exporter={false}>
        <Datagrid>
          <TextField source="description" />
          <DateField source="date" />
          <FunctionField
            source="amount"
            label="Amount"
            render={(record: any) => printMoney(record.amount)}
          />
          <TextField source="status" />
        </Datagrid>
      </List>
    </Box>
  );
};
