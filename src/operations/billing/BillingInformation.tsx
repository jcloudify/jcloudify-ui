import {EmailField, Show, SimpleShowLayout, TextField} from "react-admin";

export const ShowBillingInformationSummary: React.FC<{customerId: string}> = ({
  customerId,
}) => {
  return (
    <Show resource="paymentDetails" id={customerId} title=" ">
      <SimpleShowLayout>
        <TextField source="name" />
        <EmailField source="email" />
        <TextField source="phone" />
      </SimpleShowLayout>
    </Show>
  );
};
