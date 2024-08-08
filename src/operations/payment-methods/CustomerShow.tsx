import {Labeled, ShowBase, SimpleShowLayout, TextField} from "react-admin";
import {Stack} from "@mui/material";

export const CustomerShow: React.FC<{customerId: string}> = ({customerId}) => {
  return (
    <ShowBase resource="paymentCustomers" id={customerId}>
      <SimpleShowLayout>
        <Stack
          direction={{md: "row", sm: "column"}}
          spacing={1}
          my={2}
          px={1}
          justifyContent="space-between"
        >
          <Labeled>
            <TextField source="name" />
          </Labeled>
          <Labeled>
            <TextField source="email" />
          </Labeled>
          <Labeled>
            <TextField source="phone" />
          </Labeled>
        </Stack>
      </SimpleShowLayout>
    </ShowBase>
  );
};
