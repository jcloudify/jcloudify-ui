import {Box} from "@mui/material";
import {CardNumberElement, Elements} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";

export const DisplayCard: React.FC<{last4?: string}> = ({last4 = "xxxx"}) => {
  const stripePk = process.env.REACT_APP_STRIPE_PK;
  const stripePromise = loadStripe(stripePk!);

  return (
    <Box sx={{my: 1, width: "17rem"}}>
      <Elements stripe={stripePromise}>
        <CardNumberElement
          options={{
            disabled: true,
            placeholder: `xxxx xxxx xxxx ${last4}`,
            showIcon: true,
            iconStyle: "solid",
            style: {
              base: {
                "::placeholder": {
                  color: "gray",
                  fontSize: "large",
                },
              },
            },
          }}
        />
      </Elements>
    </Box>
  );
};
