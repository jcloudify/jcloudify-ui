import {EmailField, ShowBase, TextField} from "react-admin";
import {Stack} from "@mui/material";
import {ShowLayout} from "@/operations/components/show";
import {Labeled} from "@/operations/components/field";
import {authProvider} from "@/providers";

export const PaymentDetailsShow: React.FC = () => {
  const customerId = authProvider.getCachedWhoami()?.user?.stripe_id!;
  return (
    <ShowBase resource="paymentDetails" id={customerId}>
      <ShowLayout>
        <Stack direction="column" spacing={1} sx={{m: 2}}>
          <Labeled>
            <TextField source="name" />
            <EmailField source="email" />
            <TextField source="phone" />
          </Labeled>
        </Stack>
      </ShowLayout>
    </ShowBase>
  );
};
