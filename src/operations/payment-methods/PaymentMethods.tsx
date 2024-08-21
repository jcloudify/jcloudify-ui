import React, {useState} from "react";
import {
  IconButtonWithTooltip,
  ListBase,
  useGetOne,
  useListContext,
  useRecordContext,
} from "react-admin";
import {Box, Divider, Stack, Tooltip, Typography} from "@mui/material";
import {
  Add as AddIcon,
  Cancel as CancelIcon,
  CheckCircleOutlined as CheckIcon,
  DoneAll as DoneAllIcon,
  RemoveCircleOutlineOutlined as RemoveIcon,
} from "@mui/icons-material";
import {PaymentMethod} from "@jcloudify-api/typescript-client";
import {authProvider} from "@/providers";
import {colors} from "@/themes";
import {BankCardShow} from "./BankCardShow";

export const PaymentMethods: React.FC = () => {
  const [addPaymentMethod, setAddPaymentMethod] = useState(false);
  const record = useRecordContext();
  console.log("record: ", record);

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
      <Box my={1}>
        <PaymentMethodsList />
      </Box>
    </Box>
  );
};

const PaymentMethodsList: React.FC = () => {
  return (
    <ListBase resource="paymentMethods" exporter={false}>
      <PaymentMethodListView />
    </ListBase>
  );
};

const PaymentMethodListView: React.FC = () => {
  const {data = []} = useListContext();
  const customerId = authProvider.getCachedWhoami()?.user?.stripe_id!;
  const {data: paymentDetails} = useGetOne("paymentDetails", {id: customerId});

  const defaultId = paymentDetails.default_payment_method
    ? paymentDetails.default_payment_method.id
    : null;

  return (
    <Stack direction="column" spacing={1}>
      {data.map((card) => (
        <PaymentMethodItem
          paymentMethod={card}
          isDefault={defaultId === card.id}
        />
      ))}
    </Stack>
  );
};

const PaymentMethodItem: React.FC<{
  paymentMethod: PaymentMethod;
  isDefault: boolean;
}> = ({paymentMethod, isDefault}) => {
  return (
    <Box
      sx={{
        bgcolor: colors("gray-0"),
        p: 1,
        width: "fit-content",
        borderRadius: 1,
        border: isDefault ? 2 : 0,
      }}
    >
      <Stack direction="row" spacing={3} alignItems="center">
        <BankCardShow last4={paymentMethod.last4!} />
        {isDefault ? (
          <Tooltip title="Default payment method">
            <DoneAllIcon />
          </Tooltip>
        ) : (
          <Stack direction="row" spacing={1}>
            <IconButtonWithTooltip label="Set default">
              <CheckIcon />
            </IconButtonWithTooltip>
            <IconButtonWithTooltip label="Remove">
              <RemoveIcon />
            </IconButtonWithTooltip>
          </Stack>
        )}
      </Stack>
    </Box>
  );
};
