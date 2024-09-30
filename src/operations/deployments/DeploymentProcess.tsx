import {DeploymentState} from "@jcloudify-api/typescript-client";
import {useMemo} from "react";
import {useGetOne} from "react-admin";
import {Stack, Typography, Alert, AlertTitle} from "@mui/material";
import {
  STATUS_COLORS,
  DeploymentCheckpoint,
  flattenDeploymentState,
  mapStateToCheckpoint,
  STATUS_ICON_COMPONENTS,
  Status,
} from "@/operations/deployments/state";
import {ToRecord} from "@/providers";
import {Divider} from "@/components/divider";
import {COMMON_PAPER_BOX_SX} from "@/components/constants";
import {useGetEnvironmentApiURL} from "../environments";
import {TypographyLink} from "@/components/link";

const Checkpoint: React.FC<DeploymentCheckpoint> = ({label, status}) => {
  const statusColor = STATUS_COLORS[status];
  const StatusIcon = STATUS_ICON_COMPONENTS[status];
  return (
    <Stack
      justifyContent="flex-start"
      alignItems="center"
      direction="column"
      spacing={1}
    >
      <StatusIcon color={statusColor} size="25px" />
      <Typography
        component="span"
        fontSize="small"
        fontWeight="450"
        sx={{color: statusColor}}
      >
        {label}
      </Typography>
    </Stack>
  );
};

export const DeploymentProcess: React.FC<{
  deploymentId: string;
  appId: string;
  envId: string;
}> = ({deploymentId, appId, envId}) => {
  const {apiUrl} = useGetEnvironmentApiURL({appId, envId});

  const {data: deploymentState} = useGetOne<ToRecord<DeploymentState>>(
    "deploymentStates",
    {id: deploymentId, meta: {appId}},
    {
      refetchInterval: 30 * 1000,
    }
  );

  const states = useMemo(() => {
    if (!deploymentState) return [];
    return flattenDeploymentState(deploymentState).map(
      (state) => state.progressionStatus!
    );
  }, [deploymentState]);

  const checkpoints = useMemo(() => mapStateToCheckpoint(states), [states]);

  const [initialize, prepare, deploy] = checkpoints;

  const isDeploymentComplete = deploy.status === Status.COMPLETED;

  if (isDeploymentComplete)
    return (
      <Alert severity="success" sx={{p: 1}}>
        <AlertTitle>Deployment Completed Successfully</AlertTitle>
        {isDeploymentComplete && !!apiUrl && (
          <TypographyLink
            target="_blank"
            to={apiUrl.value!}
            fontSize="small"
            copiable={false}
          />
        )}
      </Alert>
    );

  return (
    <Stack
      p={1}
      direction="row"
      alignItems="center"
      width="100%"
      sx={COMMON_PAPER_BOX_SX}
    >
      <Checkpoint label={initialize.label} status={initialize.status} />
      <Divider
        sx={{
          borderWidth: "2px",
          mt: -3,
          flex: 1,
          borderColor:
            initialize.status === Status.COMPLETED
              ? STATUS_COLORS[Status.COMPLETED]
              : "gray",
        }}
        orientation="vertical"
      />
      <Checkpoint label={prepare.label} status={prepare.status} />
      <Divider
        sx={{
          borderWidth: "2px",
          mt: -3,
          flex: 1,
          borderColor:
            prepare.status === Status.COMPLETED
              ? STATUS_COLORS[Status.COMPLETED]
              : "gray",
        }}
        orientation="vertical"
      />
      <Checkpoint label={deploy.label} status={deploy.status} />
    </Stack>
  );
};
