import {Environment, EnvironmentType} from "@jcloudify-api/typescript-client";
import {Link, Loading} from "react-admin";
import {PiGitCommitFill as GitCommit} from "react-icons/pi";
import {
  Button,
  Box,
  Card,
  CardContent,
  CardActions,
  Typography,
  Stack,
} from "@mui/material";
import {Add, CompareArrows} from "@mui/icons-material";
import {
  ENVIRONMENT_TYPE_TEXT,
  useEnvironmentCreation,
  useGetEnvironmentMap,
} from "@/operations/environments";
import {typoSizes} from "@/components/typo";
import {BulkDeleteButton} from "@/operations/components/list";
import {useGetLatestDeployment} from "@/operations/deployments";
import {ToRecord} from "@/providers";

const ListActions: React.FC<{appId: string | undefined}> = ({appId}) => {
  const {canCreateMore, created} = useEnvironmentCreation(appId);
  return (
    <Stack py={1} direction="row" alignItems="center" spacing={2}>
      <Button
        to="diff"
        startIcon={<CompareArrows />}
        component={Link}
        variant="outlined"
        disabled={created.length !== 2}
        label="Diff"
      />

      <Button
        to="creation-template"
        startIcon={<Add />}
        component={Link}
        variant="contained"
        label="Create"
        disabled={!canCreateMore}
      />
    </Stack>
  );
};

export interface EnvironmentCardProps {
  appId: string;
  type: EnvironmentType;
  environment?: ToRecord<Environment>;
}

const ActivatedEnvironmentCard: React.FC<EnvironmentCardProps> = ({
  appId,
  type,
  environment,
}) => {
  const {latestDeployment, isLoading: isLoadingLastDeployment} =
    useGetLatestDeployment({appId, envType: type});

  return (
    <Card sx={{width: "40%", p: 1}}>
      <CardContent component={Stack} direction="column" spacing={2}>
        <Typography variant={typoSizes.lg.primary} fontWeight={560}>
          {ENVIRONMENT_TYPE_TEXT[type]}
        </Typography>

        {!!latestDeployment && (
          <Stack direction="row" alignItems="flex-start" spacing={2}>
            <Box>
              <GitCommit size={20} />
            </Box>

            <Stack direction="column">
              <Typography>
                <b>{latestDeployment.github_meta?.commit?.sha?.slice(0, 7)}</b>
                &nbsp; Latest deployed commit
              </Typography>
            </Stack>
          </Stack>
        )}
      </CardContent>
      <CardActions sx={{justifyContent: "flex-end"}}>
        <Button variant="outlined" color="error">
          Deactivate
        </Button>
      </CardActions>
    </Card>
  );
};

const DeactivatedEnvironmentCard: React.FC<EnvironmentCardProps> = ({
  appId,
  type,
  environment,
}) => {
  return (
    <Card sx={{width: "40%", p: 1}}>
      <CardContent component={Stack} direction="column" spacing={2} flex={1}>
        <Typography variant={typoSizes.lg.primary} fontWeight={560}>
          {ENVIRONMENT_TYPE_TEXT[type]}
        </Typography>
        <Typography>
          You sure you only need a Prod environment? If a bug happen Prod, it
          would be less tricky to reproduce and fix it on Preprod first, and
          promote Preprod to Prod after that.
        </Typography>

        <Typography>
          A single click on the Active button below, and you will have a Preprod
          cloned from Prod!
        </Typography>
      </CardContent>

      <CardActions sx={{justifyContent: "flex-end"}}>
        <Button variant="outlined" color="success" size="large">
          Activate
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
    <Stack mt={4} mb={3} direction="row" width="100%" spacing={3}>
      <EnvironmentCard
        appId={appId}
        type={EnvironmentType.PROD}
        environment={environmentMap.prod}
      />
      <EnvironmentCard
        appId={appId}
        type={EnvironmentType.PREPROD}
        environment={environmentMap.preprod}
      />
    </Stack>
  );
};
