import {FC} from "react";
import {
  FunctionField,
  ListBase,
  Show,
  SimpleShowLayout,
  useListContext,
} from "react-admin";
import {useParams} from "react-router-dom";
import {Card, CardContent, Stack, Typography} from "@mui/material";
import {BillingInfo, Environment} from "@jcloudify-api/typescript-client";
import {WithTab} from "@/components/tab";
import {ShowBillingInfo} from "@/operations/billing";

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
    <Stack direction="column" spacing={2}>
      <ShowBillingInfo targetId={appId} targetResource="application" />
      <ListBase resource="environments" filter={{appId}}>
        <AppBillingDetails appId={appId} />
      </ListBase>
    </Stack>
  );
};

const AppBillingDetails: FC<{appId: string}> = ({appId}) => {
  const {data: environments} = useListContext();
  return (
    <Card>
      <CardContent>
        <Typography variant="caption">Details</Typography>
        <Stack direction="column" spacing={1}>
          {environments?.length ? (
            environments?.map((env: Environment) => (
              <BillingInfoDetails env={env} appId={appId} />
            ))
          ) : (
            <Typography variant="body2">No environment found</Typography>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
};

const BillingInfoDetails: FC<{env: Environment; appId: string}> = ({
  env,
  appId,
}) => {
  return (
    <Show
      title=" "
      resource="billingInfo"
      id={env.id}
      queryOptions={{meta: {appId, targetResource: "environment"}}}
    >
      <SimpleShowLayout>
        <FunctionField
          render={(resource: BillingInfo) => (
            <Typography variant="body2">
              {env.environment_type} - $ {resource.computed_price}
            </Typography>
          )}
        />
      </SimpleShowLayout>
    </Show>
  );
};
