import {Box} from "@mui/material";
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
        <ContainerWithHeading title="Payment Method Information">
          <Elements stripe={stripePromise} options={options}>
            <PaymentMethodForm />
          </Elements>
        </ContainerWithHeading>
      </Box>
    </Box>
  );
};
