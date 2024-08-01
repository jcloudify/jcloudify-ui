import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from "@mui/material";
import {ExpandMore as ExpandMoreIcon} from "@mui/icons-material";
import {Elements} from "@stripe/react-stripe-js";
import {StripeElementsOptions, loadStripe} from "@stripe/stripe-js";
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
        </Elements>
      </Box>
    </Box>
  );
};
