import React, {useState} from "react";
import {
  EditBase,
  EmailField,
  IconButtonWithTooltip,
  Labeled,
  required,
  SaveButton,
  ShowBase,
  SimpleForm,
  SimpleShowLayout,
  TextField,
  TextInput,
} from "react-admin";
import {Box, Divider, Stack, Typography} from "@mui/material";
import {Cancel as CancelIcon, Edit as EditIcon} from "@mui/icons-material";
import {authProvider} from "@/providers";

export interface BillingDetailsFormProps {
  customerId: string;
  onSettled: () => void;
}

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
        {editCustomer ? (
          <BillingDetailsForm
            customerId={customerId}
            onSettled={() => setEditCustomer(false)}
          />
        ) : (
          <BillingDetailsShow customerId={customerId} />
        )}
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

const BillingDetailsForm: React.FC<BillingDetailsFormProps> = ({
  customerId,
  onSettled,
}) => {
  return (
    <EditBase
      resource="paymentDetails"
      redirect={false}
      id={customerId}
      mutationOptions={{onSettled}}
    >
      <SimpleForm toolbar={<SaveButton />}>
        <Stack
          direction={{md: "row", sm: "column"}}
          spacing={1}
          my={2}
          px={1}
          justifyContent="space-between"
        >
          <Box width="100%">
            <TextInput
              source="name"
              size="medium"
              fullWidth
              validate={required()}
            />
          </Box>
          <Box width="100%">
            <TextInput
              type="email"
              source="email"
              size="medium"
              fullWidth
              validate={required()}
            />
          </Box>
          <Box width="100%">
            <TextInput
              type="phone"
              source="phone"
              size="medium"
              fullWidth
              validate={required()}
            />
          </Box>
        </Stack>
      </SimpleForm>
    </EditBase>
  );
};