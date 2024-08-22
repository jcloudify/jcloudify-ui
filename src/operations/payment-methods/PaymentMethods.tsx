import React, {useState} from "react";
import {
  IconButtonWithTooltip,
  ListBase,
  useCreate,
  useDelete,
  useGetOne,
  useListContext,
} from "react-admin";
import {Box, Divider, Stack, Tooltip, Typography} from "@mui/material";
import {
  Add as AddIcon,
  Cancel as CancelIcon,
  CheckCircleOutlined as CheckIcon,
  DoneAll as DoneAllIcon,
  RemoveCircleOutlineOutlined as RemoveIcon,
} from "@mui/icons-material";
import {
  PaymentMethod,
  PaymentMethodsAction,
} from "@jcloudify-api/typescript-client";
import {authProvider} from "@/providers";
import {colors} from "@/themes";
import {BankCardShow} from "./BankCardShow";
import {Elements} from "@stripe/react-stripe-js";
import {PaymentMethodForm} from "./PaymentMethodForm";
import {loadStripe, StripeElementsOptions} from "@stripe/stripe-js";

export const PaymentMethods: React.FC = () => {
  const [addPaymentMethod, setAddPaymentMethod] = useState(false);
  const stripePk = process.env.REACT_APP_STRIPE_PK;
  const stripePromise = loadStripe(stripePk!);

  const options: StripeElementsOptions = {
    mode: "setup",
    currency: "usd",
    payment_method_types: ["card"],
    setupFutureUsage: "off_session",
    paymentMethodCreation: "manual",
  };

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
        {addPaymentMethod ? (
          <Elements stripe={stripePromise} options={options}>
            <PaymentMethodForm onSuccess={() => setAddPaymentMethod(false)} />
          </Elements>
        ) : (
          <></>
        )}
        <Box my={1}>
          <PaymentMethodsList />
        </Box>
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
          <PaymentMethodAction paymentMethodId={paymentMethod.id!} />
        )}
      </Stack>
    </Box>
  );
};

const PaymentMethodAction: React.FC<{paymentMethodId: string}> = ({
  paymentMethodId,
}) => {
  const [create] = useCreate("paymentMethods");
  const [deleteOne] = useDelete("paymentMethods");

  const setDefaultPm = async () => {
    const pmAction: PaymentMethodsAction = {
      payment_method_id: paymentMethodId,
      action: "ATTACH",
      set_default: true,
    };
    await create("paymentMethods", {
      data: pmAction,
    });
  };

  const detachPm = async () => {
    await deleteOne("paymentMethods", {
      id: paymentMethodId,
    });
  };

  return (
    <Stack direction="row" spacing={1}>
      <IconButtonWithTooltip label="Set default" onClick={setDefaultPm}>
        <CheckIcon />
      </IconButtonWithTooltip>
      <IconButtonWithTooltip label="Remove" onClick={detachPm}>
        <RemoveIcon />
      </IconButtonWithTooltip>
    </Stack>
  );
};
