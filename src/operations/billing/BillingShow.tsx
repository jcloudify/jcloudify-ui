import {BillingInfo, Environment} from "@jcloudify-api/typescript-client";
import {
  FunctionField,
  Labeled,
  ListBase,
  ShowBase,
  WithListContext,
} from "react-admin";
import {useParams} from "react-router-dom";
import {Box, Stack, Typography} from "@mui/material";
import {ToRecord} from "@/providers";
import {BillingInfoShow} from "@/operations/billing";
import {ShowLayout} from "@/operations/components/show";
import {SimpleListEmpty} from "@/operations/components/list";
import {EnvironmentType} from "@/operations/environments";
import {ContainerWithHeading} from "@/components/container";
import {colors} from "@/themes";

export const BillingShow = () => {
  const {appId} = useParams();

  if (!appId) return null;

  return (
    <Stack direction="column" spacing={2}>
      <Box sx={{p: 2, bgcolor: colors("light")}}>
        <BillingInfoShow targetId={appId} targetResource="application" />
      </Box>
      <AppEnvironmentsBillingInfo appId={appId} />
    </Stack>
  );
};

const AppEnvironmentsBillingInfo: React.FC<{appId: string}> = ({appId}) => (
  <ListBase resource="environments" filter={{appId}}>
    <WithListContext<ToRecord<Environment>>
      render={({data = []}) => (
        <ContainerWithHeading title="Details">
          {data.length ? (
            data.map((env) => (
              <EnvironmentBillingInfo env={env} appId={appId} />
            ))
          ) : (
            <SimpleListEmpty />
          )}
        </ContainerWithHeading>
      )}
    />
  </ListBase>
);

const EnvironmentBillingInfo: React.FC<{
  env: ToRecord<Environment>;
  appId: string;
}> = ({env, appId}) => (
  <ShowBase
    resource="billingInfo"
    id={env.id}
    queryOptions={{meta: {appId, targetResource: "environment"}}}
  >
    <ShowLayout>
      <Stack direction="column" spacing={1} sx={{m: 1}}>
        <EnvironmentType value={env.environment_type!} />
        <Labeled>
          <FunctionField<ToRecord<BillingInfo>>
            label="Computed price"
            render={(resource) => (
              <Typography variant="body2">
                $ {resource.computed_price}
              </Typography>
            )}
          />
        </Labeled>
      </Stack>
    </ShowLayout>
  </ShowBase>
);
