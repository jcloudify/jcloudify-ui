import {Link, ListBase, TopToolbar, useListContext} from "react-admin";
import {Stack, Grid, Paper, Typography, Avatar} from "@mui/material";
import {Commit} from "@mui/icons-material";
import {FaCodeBranch as Branch} from "react-icons/fa";
import {DeploymentState} from "@/operations/deployments";
import {TODO_Deployment} from "@/services/poja-api";
import {GITHUB_URL_PREFIX} from "@/utils/constant";
import {fromToNow} from "@/utils/date";
import {getURLComponent} from "@/utils/github_url";
import {colors} from "@/themes";

const DeploymentListItem: React.FC<{depl: TODO_Deployment}> = ({depl}) => {
  const url = getURLComponent(depl.github_meta.org, depl.github_meta.repo);
  return (
    <Grid
      container
      data-testid={`depl-${depl.id}`}
      alignItems="center"
      p={1}
      component={Paper}
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
        <Stack spacing={0.5}>
          <Stack direction="row" spacing={1.5}>
            <Branch size="16px" />
            <Typography
              flex={1}
              target="_blank"
              component={Link}
              to={url.branch(depl.github_meta.commit_branch)}
            >
              {depl.github_meta.commit_branch}
            </Typography>
          </Stack>

          <Stack
            direction="row"
            spacing={1}
            component={Link}
            to={url.commit(depl.github_meta.commit_sha)}
          >
            <Commit />
            <Stack direction="row" spacing={1}>
              <Typography fontWeight="520">
                {depl.github_meta.commit_sha.slice(0, 7)}
              </Typography>
              <Typography color="text.secondary" fontWeight="500" flex={1}>
                {depl.github_meta.commit_message}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Grid>

      <Grid item xs>
        <Link to={GITHUB_URL_PREFIX + depl.creator.username} target="_blank">
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
    </Grid>
  );
};

const DeploymentListView: React.FC = () => {
  const {data = []} = useListContext();
  return (
    <Stack spacing={1} direction="column">
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
    <TopToolbar />
    <DeploymentListView />
  </ListBase>
);
