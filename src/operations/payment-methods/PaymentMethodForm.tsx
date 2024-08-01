import {useState} from "react";
import {
  Button,
  FormControl,
  FormControlLabel,
  Stack,
  Switch,
} from "@mui/material";
import {PaymentElement, useElements, useStripe} from "@stripe/react-stripe-js";
import {paymentMethodProvider} from "@/providers/paymentMethodProvider";

export const PaymentMethodForm = () => {
  const [isSubmiting, setIsSubmiting] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const submitPaymentInfo = async (e: any) => {
    e.preventDefault();
    try {
      if (stripe && elements) {
        setIsSubmiting(true);
        const {error} = await elements.submit();
        if (error) {
          setIsSubmiting(false);
          return;
        }

        console.log("elements: ", elements);

        const {paymentMethod: pm} = await stripe.createPaymentMethod({
          elements,
        });

        const res = await paymentMethodProvider.save(pm?.id!, true);
        console.log("paymentMethod: ", res);

        setIsSubmiting(false);
      }
    } catch (error) {
      console.log("err: ", error);
      setIsSubmiting(false);
    }
  };

  return (
    <>
      <Stack
        component="form"
        onSubmit={submitPaymentInfo}
        direction={"column"}
        spacing={2}
      >
        <PaymentElement />
        <FormControl>
          <FormControlLabel
            control={<Switch />}
            label="Set as default payment method"
            labelPlacement="start"
          />
        </FormControl>
        <Button
          type="submit"
          variant="contained"
          size="large"
          sx={{mt: 1}}
          disabled={isSubmiting}
        >
          Submit
        </Button>
      </Stack>
    </>
  );
};
