import {Box} from "@mui/material";
import {CardNumberElement, Elements} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";
import {colors} from "@/themes";

export const BankCardShow: React.FC<{last4Digit: string}> = ({last4Digit}) => {
  const stripePk = process.env.REACT_APP_STRIPE_PK;
  const stripe = loadStripe(stripePk!);

  return (
    <Box
      sx={{
        bgcolor: colors("gray-1"),
        borderRadius: 1,
        width: 200,
        maxWidth: 320,
        p: 1,
      }}
    >
      <Elements stripe={stripe}>
        <CardNumberElement
          options={{
            placeholder: `xxxx xxxx xxxx ${last4Digit}`,
            showIcon: true,
            iconStyle: "solid",
            disabled: true,
            style: {
              base: {
                "::placeholder": {
                  color: colors("dark-0"),
                },
              },
            },
          }}
        />
      </Elements>
    </Box>
  );
};
