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
} from "@mui/icons-material";
import {Elements} from "@stripe/react-stripe-js";
import {StripeElementsOptions, loadStripe} from "@stripe/stripe-js";
import {ContainerWithHeading} from "@/components/container";
import {PaymentMethodForm} from "./PaymentMethodForm";
import {Datagrid, FunctionField, ListBase, TextField} from "react-admin";
import {PaymentMethod as PaymentMethodModel} from "@jcloudify-api/typescript-client";

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
