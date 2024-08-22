import {useState} from "react";
import {
  Button,
  FormControl,
  FormControlLabel,
  Stack,
  Switch,
} from "@mui/material";
import {PaymentElement, useElements, useStripe} from "@stripe/react-stripe-js";
import {useCreate, useNotify} from "react-admin";
import {PaymentMethodsAction} from "@jcloudify-api/typescript-client";

export const PaymentMethodForm: React.FC<{onSuccess: () => void}> = ({
  onSuccess,
}) => {
  const [isSubmiting, setIsSubmiting] = useState(false);
  const notify = useNotify();
  const stripe = useStripe();
  const elements = useElements();
  const [create] = useCreate("paymentMethods");
  const submitPaymentInfo = async (e: any) => {
    e.preventDefault();

    try {
      if (stripe && elements) {
        const isDefault = e.currentTarget.elements.isDefault.checked || false;
        setIsSubmiting(true);
        const {error} = await elements.submit();
        if (error) {
          setIsSubmiting(false);
          return;
        }

        const {paymentMethod: pm} = await stripe.createPaymentMethod({
          elements,
        });

        const pmAction: PaymentMethodsAction = {
          payment_method_id: pm?.id,
          action: "ATTACH",
          set_default: isDefault,
        };

        await create("paymentMethods", {
          data: pmAction,
        });

        onSuccess();
        notify("Payment method successfully added", {type: "success"});
        setIsSubmiting(false);
      }
    } catch (_err) {
      notify("An error has occured", {type: "error"});
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
            name="isDefault"
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
