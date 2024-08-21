import {useState} from "react";
import {IconButtonWithTooltip} from "react-admin";
import {Box, Divider, Stack, Typography} from "@mui/material";
import {Add as AddIcon, Cancel as CancelIcon} from "@mui/icons-material";

export const PaymentMethods: React.FC = () => {
  const [addPaymentMethod, setAddPaymentMethod] = useState(false);

  return (
    <Box>
      <Stack direction="row" spacing={1} justifyContent="space-between">
        <Typography variant="h5">Payment Methods</Typography>
        <IconButtonWithTooltip
          label={addPaymentMethod ? "Cancel" : "Add"}
          onClick={() => setAddPaymentMethod((v) => !v)}
        >
          {addPaymentMethod ? (
            <CancelIcon fontSize="small" />
          ) : (
            <AddIcon fontSize="small" />
          )}
        </IconButtonWithTooltip>
      </Stack>
      <Divider />
      <Box my={1}></Box>
    </Box>
  );
};
