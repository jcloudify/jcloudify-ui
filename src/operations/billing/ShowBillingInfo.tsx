import {BillingInfo} from "@jcloudify-api/typescript-client";
import {DateField, FunctionField, Labeled, ShowBase} from "react-admin";
import {Stack, Typography} from "@mui/material";
import {ToRecord} from "@/providers";
import {ShowLayout} from "@/operations/components/show";

export const ShowBillingInfo: React.FC<{
  targetId?: string;
  targetResource?: string;
}> = ({targetId = "summary", targetResource = "summary"}) => {
  return (
    <ShowBase
      resource="billingInfo"
      id={targetId}
      queryOptions={{meta: {targetResource}}}
    >
      <ShowLayout>
        <Stack direction="column" spacing={1}>
          <Labeled>
            <FunctionField<ToRecord<BillingInfo>>
              label="Current month"
              render={(record) => (
                <Typography variant={"h4"}>
                  $ {record.computed_price?.toFixed(2)}
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
        </Stack>
      </ShowLayout>
    </ShowBase>
  );
};
