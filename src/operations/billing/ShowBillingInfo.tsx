import {
  DateField,
  FunctionField,
  Labeled,
  Show,
  SimpleShowLayout,
} from "react-admin";
import {BillingInfo} from "@jcloudify-api/typescript-client";
import {Typography} from "@mui/material";

export const ShowBillingInfo: React.FC<{
  targetId?: string;
  targetResource?: string;
}> = ({targetId = "summary", targetResource = "summary"}) => {
  return (
    <Show
      title=" "
      emptyWhileLoading
      resource="billingInfo"
      id={targetId}
      queryOptions={{meta: {targetResource}}}
    >
      <SimpleShowLayout>
        <Labeled>
          <FunctionField
            label="Current month"
            render={(resource: BillingInfo) => (
              <Typography variant={"h4"}>
                $ {resource.computed_price?.toFixed(2)}
              </Typography>
            )}
          />
        </Labeled>
        <Labeled>
          <DateField label="Start date" source="start_time" />
        </Labeled>
        <Labeled>
          <DateField label="End date" source="end_time" />
        </Labeled>
      </SimpleShowLayout>
    </Show>
  );
};
