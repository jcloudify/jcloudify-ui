import {Datagrid, DateField, FunctionField, List, TextField} from "react-admin";
import {Box, Typography} from "@mui/material";
import {printMoney} from "../utils/print-money";

export const Payments: React.FC = () => {
  return (
    <Box>
      <PaymentList />
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
