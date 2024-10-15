import {EmailField, Labeled, ShowBase, TextField} from "react-admin";
import {Stack} from "@mui/material";
import {authProvider} from "@/providers";
import {ShowLayout} from "@/operations/components/show";

export const PaymentDeatilsShow: React.FC<{}> = () => {
  const customerId = authProvider.getCachedWhoami()?.user?.stripe_id!;
  return (
    <ShowBase resource="paymentDetails" id={customerId}>
      <ShowLayout>
        <Stack direction="column" spacing={1} sx={{m: 2}}>
          <Labeled>
            <TextField source="name" />
          </Labeled>
          <Labeled>
            <EmailField source="email" />
          </Labeled>
          <Labeled>
            <TextField source="phone" />
          </Labeled>
        </Stack>
      </ShowLayout>
    </ShowBase>
  );
};
