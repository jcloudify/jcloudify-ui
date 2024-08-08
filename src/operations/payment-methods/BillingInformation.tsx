import {useState} from "react";
import {IconButtonWithTooltip} from "react-admin";
import {Box, Divider, Stack, Typography} from "@mui/material";
import {Cancel as CancelIcon, Edit as EditIcon} from "@mui/icons-material";
import {CustomerForm, CustomerShow} from "./";

export const BillingInformation = () => {
  const [isEditCus, setEditCus] = useState(false);

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h5">Billing Information</Typography>
        <IconButtonWithTooltip
          label={isEditCus ? "cancel edit" : "edit"}
          onClick={() => setEditCus((v) => !v)}
        >
          {isEditCus ? <CancelIcon /> : <EditIcon />}
        </IconButtonWithTooltip>
      </Stack>
      <Divider />
      {isEditCus ? (
        <CustomerForm
          customerId="customer_id"
          onSettled={() => setEditCus(false)}
        />
      ) : (
        <CustomerShow customerId="customer_id" />
      )}
    </Box>
  );
};
