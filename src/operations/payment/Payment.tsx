import {Box} from "@mui/material";
import {Elements} from "@stripe/react-stripe-js";
import {StripeElementsOptions, loadStripe} from "@stripe/stripe-js";
import {PaymentMethodForm} from "./PaymentMethodForm";
import {ContainerWithHeading} from "@/components/container";

export const Payment = () => {
  const stripePk = process.env.REACT_APP_STRIPE_PK;
  const stripePromise = loadStripe(stripePk!);

  const options: StripeElementsOptions = {
    mode: "subscription",
    currency: "eur",
    locale: "fr-FR",
    paymentMethodCreation: "manual",
    amount: 1500,
    payment_method_types: ["sepa_debit"],
  };

  return (
    <Box>
      <Box sx={{width: "50%", p: 1}}>
        <ContainerWithHeading title="Payment Method Information">
          <Elements stripe={stripePromise} options={options}>
            <PaymentMethodForm />
          </Elements>
        </ContainerWithHeading>
      </Box>
    </Box>
  );
};
