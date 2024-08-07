import {useState} from "react";
import {
  Datagrid,
  FunctionField,
  IconButtonWithTooltip,
  ListBase,
  TextField,
  useCreate,
  useDelete,
} from "react-admin";
import {Box, Divider, Stack, Typography} from "@mui/material";
import {
  Add as AddIcon,
  Cancel as CancelIcon,
  Check as CheckIcon,
  Remove as RemoveIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material";
import {Elements} from "@stripe/react-stripe-js";
import {StripeElementsOptions, loadStripe} from "@stripe/stripe-js";
import {PaymentMethod as PaymentMethodModel} from "@jcloudify-api/typescript-client";
import {BillingInformation, DisplayCard, PaymentMethodForm} from "./";
import {useNavigate} from "react-router-dom";

export const PaymentMethod = () => {
  const [addPm, setAddPm] = useState(false);
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
      <Box sx={{width: {md: "75%", sm: "100%"}, p: 1}}>
        <BillingInformation />
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h5">Payment Methods</Typography>
          <IconButtonWithTooltip
            label={addPm ? "cancel" : "add payment method"}
            onClick={() => setAddPm((v) => !v)}
          >
            {addPm ? <CancelIcon /> : <AddIcon />}
          </IconButtonWithTooltip>
        </Stack>
        <Divider />
        <Box my={4}>
          {addPm ? (
            <Elements stripe={stripePromise} options={options}>
              <PaymentMethodForm onSuccess={() => setAddPm(false)} />
            </Elements>
          ) : (
            <></>
          )}
          <PaymentMethodList />
        </Box>
      </Box>
    </Box>
  );
};

const PaymentMethodList = () => {
  return (
    <Box my={4}>
      <ListBase resource="paymentMethods">
        <Datagrid>
          <FunctionField
            source="last4"
            label="Number"
            render={(record: PaymentMethodModel) =>
              `xxxx xxxx xxxx ${record.last4}`
            }
          />
          <TextField source="brand" />
          <TextField source="type" />
          <FunctionField
            label="Action"
            render={(record: PaymentMethodModel) => (
              <PaymentMethodAction record={record} />
            )}
          />
        </Datagrid>
      </ListBase>
    </Box>
  );
};

const PaymentMethodAction: React.FC<{record: PaymentMethodModel}> = ({
  record,
}) => {
  const [create] = useCreate("paymentMethods");
  const [deleteOne] = useDelete("paymentMethods");

  const setDefaultPm = async () => {
    await create("paymentMethods", {
      data: {id: record.id, setDefault: true},
    });
  };

  const detachPm = async () => {
    await deleteOne("paymentMethods", {
      id: record.id,
    });
  };
  return (
    <Stack direction="row" spacing={1}>
      <IconButtonWithTooltip label="set default" onClick={setDefaultPm}>
        <CheckIcon fontSize="inherit" />
      </IconButtonWithTooltip>
      <IconButtonWithTooltip label="Delete" onClick={detachPm}>
        <RemoveIcon fontSize="inherit" />
      </IconButtonWithTooltip>
    </Stack>
  );
};

export const PaymentMethodSummary = () => {
  const navigate = useNavigate();
  return (
    <Box>
      <Stack direction="row" spacing={1} justifyContent="space-between" mb={1}>
        <Typography variant="h6">Payment Method</Typography>
        <IconButtonWithTooltip
          label="Manage Payment Methods"
          onClick={() => navigate("/billing/payment-methods")}
        >
          <SettingsIcon fontSize="small" />
        </IconButtonWithTooltip>
      </Stack>
      <Box>
        <Typography variant="body2">Your default payment method</Typography>
        <DisplayCard last4="4242" />
      </Box>
    </Box>
  );
};
