import {FC} from "react";
import {Box, Stack} from "@mui/material";
import {BillingSummary} from "./Billing";

export const Payments: FC = () => {
  return (
    <Stack direction="column" spacing={1}>
      <BillingSummary />
      <Box>
        Sunt excepteur sunt quis et voluptate qui incididunt. Veniam mollit sunt
        est anim veniam sint amet excepteur sit pariatur commodo consequat.
        Velit voluptate quis quis dolor esse ullamco do mollit est. Laboris esse
        ut officia dolor irure duis adipisicing excepteur.
      </Box>
    </Stack>
  );
};
