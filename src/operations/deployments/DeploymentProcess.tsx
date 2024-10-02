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
      spacing={0.5}
      p={1}
      borderRadius="4px"
      data-checkpoint={label}
      data-status={status}
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
    const states = (
      deploymentState ? flattenDeploymentState(deploymentState) : []
    ).map((state) => state.progressionStatus!);
    return mapStateToCheckpoint(states);
  }, [deploymentState]);

  const [securityAndSanityCheck, provisionInfra, deployApplication] =
    checkpoints;

  const isDeploymentComplete = deployApplication.status === STATUS.COMPLETED;

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
      <Checkpoint
        label={securityAndSanityCheck.label}
        status={securityAndSanityCheck.status}
      />
      <Divider
        sx={{
          borderWidth: "2px",
          flex: 1,
          borderColor:
            securityAndSanityCheck.status === STATUS.COMPLETED
              ? STATUS_COLORS[STATUS.COMPLETED]
              : "gray",
        }}
        orientation="vertical"
      />
      <Checkpoint label={provisionInfra.label} status={provisionInfra.status} />
      <Divider
        sx={{
          borderWidth: "2px",
          flex: 1,
          borderColor:
            provisionInfra.status === STATUS.COMPLETED
              ? STATUS_COLORS[STATUS.COMPLETED]
              : "gray",
        }}
        orientation="vertical"
      />
      <Checkpoint
        label={deployApplication.label}
        status={deployApplication.status}
      />
    </Stack>
  );
};
