import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  Check as CheckIcon,
  ExpandMore as ExpandMoreIcon,
  Remove as RemoveIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material";
import {
  Datagrid,
  FunctionField,
  Labeled,
  ListBase,
  ShowBase,
  SimpleShowLayout,
  TextField,
} from "react-admin";
import {Elements} from "@stripe/react-stripe-js";
import {StripeElementsOptions, loadStripe} from "@stripe/stripe-js";
import {PaymentMethod as PaymentMethodModel} from "@jcloudify-api/typescript-client";
import {ContainerWithHeading} from "@/components/container";
import {PaymentMethodForm} from "./PaymentMethodForm";

export const PaymentMethod = () => {
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
        <Typography variant="h5">Payment Methods</Typography>
        <Divider />
        <Box my={4}>
          <Elements stripe={stripePromise} options={options}>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <Typography>Add Payment Method</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <ContainerWithHeading title="Payment Method Information">
                  <PaymentMethodForm />
                </ContainerWithHeading>
              </AccordionDetails>
            </Accordion>
            <PaymentMethodList />
          </Elements>
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
            render={(_record: PaymentMethodModel) => (
              <Stack direction="row" spacing={1}>
                <Tooltip title="Set default">
                  <IconButton size="small" color="primary">
                    <CheckIcon fontSize="inherit" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                  <IconButton size="small">
                    <RemoveIcon fontSize="inherit" />
                  </IconButton>
                </Tooltip>
              </Stack>
            )}
          />
        </Datagrid>
      </ListBase>
    </Box>
  );
};

const BillingInformation = () => {
  return (
    <Box>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h5">Billing Information</Typography>
        <Tooltip title="Edit Billing Information">
          <IconButton
            aria-label="payment-method"
            size="small"
            onClick={() => {}}
          >
            <SettingsIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Stack>
      <Divider />
      <CustomerShow />
    </Box>
  );
};

const CustomerShow = () => {
  return (
    <ShowBase resource="paymentCustomers" id="customer_id">
      <SimpleShowLayout>
        <Stack
          direction={{md: "row", sm: "column"}}
          spacing={1}
          my={2}
          px={1}
          justifyContent="space-between"
        >
          <Labeled>
            <TextField source="name" />
          </Labeled>
          <Labeled>
            <TextField source="email" />
          </Labeled>
          <Labeled>
            <TextField source="phone" />
          </Labeled>
        </Stack>
      </SimpleShowLayout>
    </ShowBase>
  );
};
