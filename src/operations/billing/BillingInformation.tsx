import {
  EmailField,
  FunctionField,
  Show,
  SimpleShowLayout,
  TextField,
} from "react-admin";
import {Typography} from "@mui/material";
import {PaymentCustomer} from "@jcloudify-api/typescript-client";

export const ShowBillingInformationSummary: React.FC<{customerId: string}> = ({
  customerId,
}) => {
  return (
    <Show resource="paymentDetails" id={customerId} title=" ">
      <SimpleShowLayout>
        <TextField source="name" />
        <EmailField source="email" />
        <TextField source="phone" />
        <FunctionField
          source="default_payment_method"
          render={(record: PaymentCustomer) =>
            record.default_payment_method ? (
              <Typography variant="body2">XXXX</Typography>
            ) : (
              <Typography variant="body2">
                No default payment method.
              </Typography>
            )
          }
        />
      </SimpleShowLayout>
    </Show>
  );
};
