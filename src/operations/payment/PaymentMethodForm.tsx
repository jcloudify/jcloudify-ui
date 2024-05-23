import {useState} from "react";
import {Box, Button} from "@mui/material";
import {PaymentElement, useElements, useStripe} from "@stripe/react-stripe-js";
import {useNavigate} from "react-router-dom";

export const PaymentMethodForm = () => {
  const [isSubmiting, setIsSubmiting] = useState(false);
  const navigate = useNavigate();
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

        await stripe.createPaymentMethod({
          elements,
        });

        // Create client and attach paymentMethode server side

        setIsSubmiting(false);
        navigate("/applications");
      }
    } catch (error) {
      console.log("err: ", error);
      setIsSubmiting(false);
    }
  };

  return (
    <>
      <Box component="form" onSubmit={submitPaymentInfo}>
        <PaymentElement />
        <Button
          type="submit"
          variant="contained"
          size="large"
          sx={{mt: 1}}
          disabled={isSubmiting}
        >
          Submit
        </Button>
      </Box>
    </>
  );
};
