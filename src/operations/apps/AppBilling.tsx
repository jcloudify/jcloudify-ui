import {BillingInfo, Environment} from "@jcloudify-api/typescript-client";
import {
  FunctionField,
  Labeled,
  ListBase,
  Show,
  useListContext,
} from "react-admin";
import {useParams} from "react-router-dom";
import {Card, CardContent, Stack, Typography} from "@mui/material";
import {ToRecord} from "@/providers";
import {ShowBillingInfo} from "@/operations/billing";
import {EnvironmentType} from "@/operations/environments";
import {ShowLayout} from "@/operations/components/show";
import {WithTab} from "@/components/tab";

export const AppBilling: React.FC = () => (
  <WithTab tab="Billing">
    <BillingShow />
  </WithTab>
);

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

const AppBillingDetails: React.FC<{appId: string}> = ({appId}) => {
  const {data: environments = []} = useListContext<ToRecord<Environment>>();
  return (
    <Card>
      <CardContent>
        <Typography variant="caption">Details</Typography>
        <Stack direction="column" spacing={1}>
          {environments.length ? (
            environments.map((env) => (
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

const BillingInfoDetails: React.FC<{env: Environment; appId: string}> = ({
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
      <ShowLayout>
        <Stack direction="column" spacing={1} sx={{m: 1}}>
          <EnvironmentType value={env.environment_type!} />
          <Labeled>
            <FunctionField
              label="Computed price"
              render={(resource: BillingInfo) => (
                <Typography variant="body2">
                  $ {resource.computed_price}
                </Typography>
              )}
            />
          </Labeled>
        </Stack>
      </ShowLayout>
    </Show>
  );
};
