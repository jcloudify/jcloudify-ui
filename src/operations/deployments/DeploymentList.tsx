import {
  Link,
  ListBase,
  ListToolbar,
  SelectInput,
  useGetList,
  useListContext,
  required,
} from "react-admin";
import {Box, Stack, Grid, Paper, Typography, Avatar} from "@mui/material";
import {TopLink} from "@/components/link";
import {VCS} from "@/components/source_control";
import {DeploymentState} from "@/operations/deployments";
import {TODO_Deployment} from "@/services/poja-api";
import {GITHUB_URL_PREFIX} from "@/utils/constant";
import {fromToNow} from "@/utils/date";
import {colors} from "@/themes";
import {makeSelectChoices} from "../utils/ra-props";

const DeploymentListItem: React.FC<{depl: TODO_Deployment}> = ({depl}) => {
  return (
    <Grid
      container
      data-testid={`depl-${depl.id}`}
      role="button"
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
        <Box zIndex={2} position="relative">
          <VCS {...depl.github_meta} />
        </Box>
      </Grid>

      <Grid item xs>
        <Link
          to={GITHUB_URL_PREFIX + depl.creator.username}
          target="_blank"
          sx={{zIndex: 2, position: "relative"}}
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
      <TopLink
        data-testid={`show-${depl.id}-depl`}
        to={`${depl.id}`}
        index={1}
      />
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

export const DeploymentList: React.FC<{appId: string}> = ({appId}) => {
  const {data: envs = []} = useGetList("environments", {
    meta: {
      application_id: appId,
    },
  });

  return (
    <ListBase
      resource="deployments"
      queryOptions={{meta: {application_id: appId}}}
      filterDefaultValues={{env_type: "All Environments"}}
    >
      <Box mt={1}>
        <ListToolbar
          title=" "
          filters={[
            <SelectInput
              label="Environment"
              source="env_type"
              validate={required()}
              choices={[
                {id: "_", environment_type: "All Environments"},
                ...envs,
              ]}
              optionText="environment_type"
              optionValue="environment_type"
              variant="outlined"
              alwaysOn
            />,
            <SelectInput
              label="Status"
              source="status"
              choices={makeSelectChoices(["Ready", "In Progress", "Failed"])}
              emptyText="Status"
              variant="outlined"
              alwaysOn
            />,
          ]}
        />
      </Box>
      <DeploymentListView />
    </ListBase>
  );
};
