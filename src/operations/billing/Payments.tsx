import {FC} from "react";
import {Box, Stack} from "@mui/material";
import {BillingSummary} from "./Billing";

export const Payments: FC = () => {
  return (
    <Stack direction="column" spacing={1}>
      <BillingSummary />
      <Box></Box>
    </Stack>
  );
};
