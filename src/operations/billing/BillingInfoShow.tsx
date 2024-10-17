import {BillingInfo} from "@jcloudify-api/typescript-client";
import {DateField, FunctionField, ShowBase} from "react-admin";
import {Stack, Typography} from "@mui/material";
import {ShowLayout} from "@/operations/components/show";
import {Labeled} from "@/operations/components/field";
import {ToRecord} from "@/providers";

export const BillingInfoShow: React.FC<{
  targetId?: string;
  targetResource?: string;
}> = ({targetId = "*", targetResource = "*"}) => (
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
              <Typography variant="h4">
                $ {record.computed_price?.toFixed(2)}
              </Typography>
            )}
          />
          <DateField label="Start date" source="start_time" />
          <DateField label="End date" source="end_time" />
        </Labeled>
      </Stack>
    </ShowLayout>
  </ShowBase>
);
