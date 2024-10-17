import {BillingInfo, Environment} from "@jcloudify-api/typescript-client";
import {
  FunctionField,
  Labeled,
  ListBase,
  ShowBase,
  WithListContext,
} from "react-admin";
import {Box, Stack, Typography} from "@mui/material";
import {ContainerWithHeading} from "@/components/container";
import {ShowLayout} from "@/operations/components/show";
import {SimpleListEmpty} from "@/operations/components/list";
import {BillingInfoShow} from "@/operations/billing";
import {EnvironmentType} from "@/operations/environments";
import {ToRecord} from "@/providers";
import {colors} from "@/themes";

export const BillingShow: React.FC<{appId: string}> = ({appId}) => (
  <Stack direction="column" spacing={2}>
    <Box sx={{p: 2, bgcolor: colors("light")}}>
      <BillingInfoShow targetId={appId} targetResource="application" />
    </Box>
    <AppEnvironmentsBillingInfo appId={appId} />
  </Stack>
);

const AppEnvironmentsBillingInfo: React.FC<{appId: string}> = ({appId}) => (
  <ListBase resource="environments" filter={{appId}}>
    <WithListContext<ToRecord<Environment>>
      render={({data = []}) => (
        <ContainerWithHeading title="Details">
          {data.length ? (
            data.map((env) => (
              <EnvironmentBillingInfo
                env={env}
                appId={appId}
                key={`billing_info_${env.id}`}
              />
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
