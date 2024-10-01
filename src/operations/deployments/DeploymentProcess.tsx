import {DeploymentState} from "@jcloudify-api/typescript-client";
import {useMemo} from "react";
import {useGetOne} from "react-admin";
import {Stack, Typography, Alert, AlertTitle} from "@mui/material";
import {
  CheckpointProgress,
  flattenDeploymentState,
  mapStateToCheckpoint,
  STATUS,
  STATUS_ICONS,
  STATUS_COLORS,
} from "@/operations/deployments/state";
import {ToRecord} from "@/providers";
import {Divider} from "@/components/divider";
import {COMMON_PAPER_BOX_SX} from "@/components/constants";
import {useGetEnvironmentApiURL} from "../environments";
import {TypographyLink} from "@/components/link";

const Checkpoint: React.FC<CheckpointProgress> = ({label, status}) => {
  const statusColor = STATUS_COLORS[status];
  const StatusIcon = STATUS_ICONS[status];
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

  const checkpoints = useMemo(() => {
    if (!deploymentState) return [];
    const states = flattenDeploymentState(deploymentState).map(
      (state) => state.progressionStatus!
    );
    return mapStateToCheckpoint(states);
  }, [deploymentState]);

  const [initialize, prepare, deploy] = checkpoints;

  const isDeploymentComplete = deploy.status === STATUS.COMPLETED;

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
            initialize.status === STATUS.COMPLETED
              ? STATUS_COLORS[STATUS.COMPLETED]
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
            prepare.status === STATUS.COMPLETED
              ? STATUS_COLORS[STATUS.COMPLETED]
              : "gray",
        }}
        orientation="vertical"
      />
      <Checkpoint label={deploy.label} status={deploy.status} />
    </Stack>
  );
};
