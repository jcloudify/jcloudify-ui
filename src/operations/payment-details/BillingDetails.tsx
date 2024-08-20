import React, {useState} from "react";
import {
  EmailField,
  IconButtonWithTooltip,
  Labeled,
  ShowBase,
  SimpleShowLayout,
  TextField,
} from "react-admin";
import {Box, Divider, Stack, Typography} from "@mui/material";
import {Cancel as CancelIcon, Edit as EditIcon} from "@mui/icons-material";
import {authProvider} from "@/providers";

export const BillingInformation: React.FC = () => {
  const customerId = authProvider.getCachedWhoami()?.user?.stripe_id!;
  const [editCustomer, setEditCustomer] = useState(false);
  return (
    <Box>
      <Stack direction="row" spacing={1} justifyContent="space-between">
        <Typography variant="h5">Billing Information</Typography>
        <IconButtonWithTooltip
          label={editCustomer ? "Cancel" : "Edit"}
          onClick={() => setEditCustomer((v) => !v)}
        >
          {editCustomer ? (
            <CancelIcon fontSize="small" />
          ) : (
            <EditIcon fontSize="small" />
          )}
        </IconButtonWithTooltip>
      </Stack>
      <Divider />
      <Box my={1}>
        <BillingDetailsShow customerId={customerId} />
      </Box>
    </Box>
  );
};

const BillingDetailsShow: React.FC<{customerId: string}> = ({customerId}) => {
  return (
    <ShowBase resource="paymentDetails" id={customerId}>
      <SimpleShowLayout>
        <Stack
          direction={{md: "row", sm: "column"}}
          spacing={1}
          my={2}
          px={1}
          justifyContent="space-between"
        >
          <Box width="100%">
            <Labeled>
              <TextField source="name" />
            </Labeled>
          </Box>
          <Box width="100%">
            <Labeled>
              <EmailField source="email" />
            </Labeled>
          </Box>
          <Box width="100%">
            <Labeled>
              <TextField source="phone" />
            </Labeled>
          </Box>
        </Stack>
      </SimpleShowLayout>
    </ShowBase>
  );
};
