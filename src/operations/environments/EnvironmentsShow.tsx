import {
  BillingInfo,
  Environment,
  EnvironmentType as EnvironmentTypeEnum,
  OneOfPojaConf,
} from "@jcloudify-api/typescript-client";
import {
  DeleteWithConfirmButton,
  Link,
  Loading,
  RecordContextProvider,
  useGetOne,
} from "react-admin";
import {
  PiGitCommitFill as GitCommitIcon,
  PiAppWindowFill as Cloud,
} from "react-icons/pi";
import {
  Button,
  Box,
  Card,
  CardContent,
  CardActions,
  Typography,
  Stack,
  CircularProgress,
} from "@mui/material";
import {CompareArrows} from "@mui/icons-material";
import {nanoid} from "nanoid";
import {
  ENVIRONMENT_TYPE_TEXT,
  EnvironmentType,
  useCreateEnvironmentWithConfig,
  useEnvironmentCreation,
  useGetEnvironmentApiURL,
  useGetEnvironmentMap,
} from "@/operations/environments";
import {typoSizes} from "@/components/typo";
import {TopLink, TypographyLink} from "@/components/link";
import {useGetLatestDeployment} from "@/operations/deployments";
import {GitCommit} from "@/components/source_control";
import {getPojaVersionedComponent} from "@/operations/environments/poja-conf-form/poja-conf-record";
import {ToRecord} from "@/providers";
import {fromToNow} from "@/utils/date";
import {colors} from "@/themes";

const ListActions: React.FC<{appId: string | undefined}> = ({appId}) => {
  const {created} = useEnvironmentCreation(appId);
  return (
    <Stack
      py={1}
      direction="row"
      alignItems="center"
      spacing={2}
      justifyContent="flex-end"
    >
      <Button
        to="diff"
        startIcon={<CompareArrows />}
        component={Link}
        variant="outlined"
        disabled={created.length !== 2}
      >
        Diff
      </Button>
    </Stack>
  );
};

export interface EnvironmentCardProps {
  appId: string;
  type: EnvironmentTypeEnum;
  environment?: ToRecord<Environment>;
}

const ActiveDeploymentUrl: React.FC<{appId: string; envId: string}> = ({
  appId,
  envId,
}) => {
  const {apiUrl, isLoadingApiURL} = useGetEnvironmentApiURL({appId, envId});
  if (isLoadingApiURL || !apiUrl?.value) return null;
  return (
    <Stack direction="row" alignItems="flex-start" spacing={2}>
      <Box>
        <Cloud size={18} />
      </Box>

      <Box>
        <TypographyLink
          data-testid="api-url"
          fontSize="small"
          disableOpenIcon
          copiable={false}
          target="_blank"
          to={apiUrl?.value!}
          zIndex={2}
        >
          {apiUrl?.value}
        </TypographyLink>
      </Box>
    </Stack>
  );
};

const LatestDeployedCommit: React.FC<{
  appId: string;
  envType: EnvironmentTypeEnum;
}> = ({appId, envType}) => {
  const {latestDeployment, isLoading} = useGetLatestDeployment({
    appId,
    envType,
  });
  if (isLoading) {
    return (
      <Stack direction="row" spacing={2}>
        <CircularProgress size={15} />
        <Typography flex={1}>Fetching latest deployed commit...</Typography>
      </Stack>
    );
  }
  if (!isLoading && !latestDeployment) {
    return <Typography>No deployed commit yet.</Typography>;
  }

  const {github_meta, creation_datetime} = latestDeployment;

  return (
    <Stack direction="row" alignItems="flex-start" spacing={2}>
      <Box>
        <GitCommitIcon size={18} />
      </Box>

      <Stack direction="column" spacing={0.5}>
        <Box zIndex={2}>
          <GitCommit {...github_meta} />
        </Box>
        <Typography color="text.secondary">
          {fromToNow(creation_datetime!)}
        </Typography>
      </Stack>
    </Stack>
  );
};

const MonthToDateCost: React.FC<{appId: string; envId: string}> = ({
  appId,
  envId,
}) => {
  const {data: billingInfo, isLoading} = useGetOne<ToRecord<BillingInfo>>(
    "billingInfo",
    {
      id: envId,
      meta: {
        appId,
        targetResource: "environment",
      },
    }
  );

  if (isLoading) {
    return (
      <Stack direction="row" spacing={2}>
        <CircularProgress size={15} />
        <Typography flex={1}>Computing environment billing...</Typography>
      </Stack>
    );
  }

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Typography fontWeight="520" variant={typoSizes.sm.primary}>
        $ {billingInfo?.computed_price}
      </Typography>
      &nbsp;
      <Typography
        color="text.secondary"
        fontWeight="500"
        flex={1}
        variant="body1"
      >
        Month-to-date cost
      </Typography>
    </Stack>
  );
};

const ActivatedEnvironmentCard: React.FC<EnvironmentCardProps> = ({
  appId,
  environment,
  type,
}) => {
  return (
    <Card
      data-testid={`environment-${environment?.id}`}
      data-cy={`environment-${type}`}
      role="button"
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column !important",
        position: "relative",
      }}
    >
      <CardContent
        component={Stack}
        direction="column"
        spacing={2}
        sx={{flex: 1, p: 2}}
      >
        <Typography variant={typoSizes.lg.primary} fontWeight={560}>
          {ENVIRONMENT_TYPE_TEXT[environment?.environment_type!]}
        </Typography>

        <Stack
          flex={1}
          direction="column"
          spacing={2}
          borderBottom={`1px solid ${colors("gray-0")}`}
          pb={2.5}
        >
          <LatestDeployedCommit
            appId={appId}
            envType={environment?.environment_type!}
          />
          <ActiveDeploymentUrl appId={appId} envId={environment?.id!} />
        </Stack>

        <MonthToDateCost appId={appId} envId={environment?.id!} />
      </CardContent>

      <CardActions sx={{justifyContent: "flex-end", p: 2}}>
        <RecordContextProvider value={environment!}>
          <DeleteWithConfirmButton
            aria-label="Deactivate"
            sx={{zIndex: 3}}
            resource="environments"
            confirmColor="warning"
            variant="outlined"
            size="large"
            startIcon={false}
            label="Deactivate"
            confirmContent="Are you sure you want to deactivate this environment?"
            confirmTitle={
              <span>
                Deactivate &nbsp;
                <EnvironmentType value={environment?.environment_type!} />
                &nbsp; environment
              </span>
            }
            mutationOptions={{
              meta: {
                appId,
              },
              onSuccess: () => {
                /* prevents auto redirect */
              },
            }}
          />
        </RecordContextProvider>
      </CardActions>

      <TopLink
        index={1}
        to={environment?.id!}
        data-testid={`show-${type}-environment`}
      />
    </Card>
  );
};

const DeactivatedEnvironmentCard: React.FC<EnvironmentCardProps> = ({
  appId,
  type,
}) => {
  const {created} = useEnvironmentCreation(appId);
  const toActivateFrom = created[0];

  const [createEnvironmentWithConfig, {isLoading: isActivatingEnvironment}] =
    useCreateEnvironmentWithConfig(appId);

  const {data: activationConfig, isLoading: isLoadingActivationConfig} =
    useGetOne<ToRecord<OneOfPojaConf>>("pojaConf", {
      id: toActivateFrom?.id,
      meta: {
        appId,
        targetResource: "environment",
      },
    });

  const activateEnvironment = async () => {
    if (!toActivateFrom) {
      const pcc = getPojaVersionedComponent("3.6.2");
      return createEnvironmentWithConfig({
        config: pcc.formDefaultValues!,
        environment: {id: nanoid(), environment_type: type, archived: false},
      });
    }

    createEnvironmentWithConfig({
      config: activationConfig!,
      environment: {id: nanoid(), environment_type: type, archived: false},
    });
  };

  return (
    <Card
      data-cy={`environment-${type}`}
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column !important",
        position: "relative",
      }}
    >
      <CardContent
        component={Stack}
        direction="column"
        spacing={2}
        p={2}
        flex={1}
      >
        <Typography variant={typoSizes.lg.primary} fontWeight={560}>
          {ENVIRONMENT_TYPE_TEXT[type]}
        </Typography>
        {type === EnvironmentTypeEnum.PREPROD && toActivateFrom && (
          <Typography>
            You sure you only need a Prod environment? If a bug happens on Prod,
            it would be less tricky to reproduce and fix it on Preprod first,
            and promote Preprod to Prod after that.
          </Typography>
        )}

        <Typography>
          A single click on the Active button below, and you will have a{" "}
          <b>{ENVIRONMENT_TYPE_TEXT[type!]}</b>&nbsp;
          {toActivateFrom && (
            <>
              cloned from{" "}
              <b>{ENVIRONMENT_TYPE_TEXT[toActivateFrom.environment_type!]}</b>!
            </>
          )}
        </Typography>
      </CardContent>

      <CardActions sx={{justifyContent: "flex-end", p: 2}}>
        <Button
          aria-label="Activate"
          variant="outlined"
          color="success"
          size="large"
          onClick={activateEnvironment}
          disabled={isActivatingEnvironment || isLoadingActivationConfig}
          sx={{zIndex: 2}}
        >
          {isActivatingEnvironment ? "Activating..." : "Activate"}
        </Button>
      </CardActions>
    </Card>
  );
};

export const EnvironmentCard: React.FC<EnvironmentCardProps> = (props) => {
  if (!props.environment) return <DeactivatedEnvironmentCard {...props} />;
  return <ActivatedEnvironmentCard {...props} />;
};

export const EnvironmentsShow: React.FC<{appId: string}> = ({appId}) => {
  const {environmentMap, isLoading} = useGetEnvironmentMap(appId);

  if (isLoading)
    return (
      <Box mt={4}>
        <Loading loadingPrimary="" loadingSecondary="" />
      </Box>
    );

  return (
    <Stack mt={1}>
      <ListActions appId={appId} />

      <Stack mb={3} direction="row" width="100%" spacing={3}>
        <EnvironmentCard
          appId={appId}
          type={EnvironmentTypeEnum.PROD}
          environment={environmentMap.prod}
        />
        <EnvironmentCard
          appId={appId}
          type={EnvironmentTypeEnum.PREPROD}
          environment={environmentMap.preprod}
        />
      </Stack>
    </Stack>
  );
};
