import {FC} from "react";
import {Box, Typography} from "@mui/material";
import {WithTab} from "@/components/tab";
import {FunctionField, Labeled, Show, SimpleShowLayout} from "react-admin";
import {useParams} from "react-router-dom";
import {BillingInfo} from "@jcloudify-api/typescript-client";

export const AppBilling: FC = () => {
  return (
    <WithTab tab="Billing">
      <BillingShow />
    </WithTab>
  );
};

const BillingShow = () => {
  const {appId} = useParams();

  if (!appId) return null;

  return (
    <Box>
      <ShowAppBillingInfo appId={appId} />
    </Box>
  );
};

const ShowAppBillingInfo: FC<{appId: string}> = ({appId}) => {
  return (
    <Show
      emptyWhileLoading
      resource="billingInfo"
      id={appId}
      queryOptions={{meta: {targetResource: "application"}}}
    >
      <SimpleShowLayout>
        <Labeled>
          <FunctionField
            label="Amount to due"
            render={(resource: BillingInfo) => (
              <Typography variant={"h4"}>
                $ {resource.computed_price?.toFixed(2)}
              </Typography>
            )}
          />
        </Labeled>
        <Labeled>
          <FunctionField
            label="Start date"
            source="start_time"
            render={(resource: BillingInfo) => (
              <Typography variant="body2">
                {resource.start_time?.toDateString()}
              </Typography>
            )}
          />
        </Labeled>
        <Labeled>
          <FunctionField
            label="End date"
            source="start_time"
            render={(resource: BillingInfo) => (
              <Typography variant="body2">
                {resource.end_time?.toDateString()}
              </Typography>
            )}
          />
        </Labeled>
      </SimpleShowLayout>
    </Show>
  );
};
