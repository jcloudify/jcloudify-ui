import {Link, ListBase, useListContext} from "react-admin";
import {Stack, Grid, Paper, Typography, Avatar} from "@mui/material";
import {TopLink} from "@/components/link";
import {DeploymentState} from "@/operations/deployments";
import {TODO_Deployment} from "@/services/poja-api";
import {GITHUB_URL_PREFIX} from "@/utils/constant";
import {fromToNow} from "@/utils/date";
import {colors} from "@/themes";
import {VCS} from "@/components/source_control";

const DeploymentListItem: React.FC<{depl: TODO_Deployment}> = ({depl}) => {
  return (
    <Grid
      container
      data-testid={`depl-${depl.id}`}
      alignItems="center"
      p={1}
      component={Paper}
      position="relative"
    >
      <Grid item xs>
        <Stack spacing={0.5}>
          <Typography fontWeight="520">{depl.id}</Typography>

          <Typography fontWeight="400">{depl.target_env_type}</Typography>
        </Stack>
      </Grid>

      <Grid item xs>
        <Stack spacing={0.5} direction="row" alignItems="center">
          <Typography fontWeight="510">
            <DeploymentState value={depl.state} />
          </Typography>

          <Typography color="text.secondary" variant="body2">
            {depl.state === "READY" && fromToNow(depl.createdAt)}
          </Typography>
        </Stack>
      </Grid>

      <Grid item xs>
        <VCS {...depl.github_meta} />
      </Grid>

      <Grid item xs>
        <Link
          to={GITHUB_URL_PREFIX + depl.creator.username}
          target="_blank"
          sx={{zIndex: 3, position: "relative"}}
        >
          <Stack direction="row" spacing={1} alignItems="center">
            <div>
              by{" "}
              <Typography fontWeight="510" sx={{display: "inline"}}>
                {depl.creator.username}
              </Typography>
            </div>
            <Avatar
              src={depl.creator.avatar}
              sx={{
                height: 20,
                width: 20,
                border: `1px solid ${colors("gray-1")}`,
              }}
            />
          </Stack>
        </Link>
      </Grid>
      <TopLink to={`${depl.id}`} />
    </Grid>
  );
};

const DeploymentListView: React.FC = () => {
  const {data = []} = useListContext();
  return (
    <Stack spacing={1} direction="column" my={4}>
      {data.map((depl) => (
        <DeploymentListItem depl={depl} key={depl.id} />
      ))}
    </Stack>
  );
};

export const DeploymentList: React.FC<{appId: string}> = ({appId}) => (
  <ListBase
    resource="deployments"
    queryOptions={{meta: {application_id: appId}}}
  >
    <DeploymentListView />
  </ListBase>
);
