import {
  EditBase,
  required,
  SaveButton,
  SimpleForm,
  TextInput,
} from "react-admin";
import {Stack} from "@mui/material";

export interface CustomerFormProps {
  customerId: string;
  onSettled: () => void;
}

export const CustomerForm: React.FC<CustomerFormProps> = ({
  customerId,
  onSettled,
}) => {
  return (
    <EditBase
      resource="paymentCustomers"
      id={customerId}
      mutationOptions={{onSettled}}
      redirect={false}
    >
      <SimpleForm toolbar={<SaveButton />}>
        <Stack
          direction={{md: "row", sm: "column"}}
          spacing={1}
          my={2}
          px={1}
          justifyContent="space-between"
        >
          <TextInput
            source="name"
            size="medium"
            fullWidth
            validate={required()}
          />
          <TextInput
            type="email"
            source="email"
            size="medium"
            fullWidth
            validate={required()}
          />
          <TextInput
            source="phone"
            size="medium"
            fullWidth
            validate={required()}
          />
        </Stack>
      </SimpleForm>
    </EditBase>
  );
};
