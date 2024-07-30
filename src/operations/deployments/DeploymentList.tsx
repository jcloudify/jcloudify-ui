import React from "react";
import {Environment} from "@jcloudify-api/typescript-client";
import {
  Link,
  ListBase,
  ListToolbar as RAListToolbar,
  SelectInput,
  useGetList,
  useListContext,
  required,
  DateInput,
  Filter,
  maxValue,
} from "react-admin";
import {
  Box,
  Stack,
  Grid,
  Paper,
  Typography,
  Avatar,
  styled,
} from "@mui/material";
import {TopLink} from "@/components/link";
import {VCS} from "@/components/source_control";
import {GridLayout} from "@/components/grid";
import {COMMON_RA_SELECT_INPUT_SX_PROPS} from "@/components/constants";
import {DeploymentState} from "@/operations/deployments";
import {Pagination} from "@/operations/components/list";
import {EnvironmentType} from "@/operations/environments";
import {makeSelectChoices} from "@/operations/utils/ra-props";
import {TODO_Deployment} from "@/services/poja-api";
import {Dict} from "@/providers";
import {colors} from "@/themes";
import {GITHUB_URL_PREFIX} from "@/utils/constant";
import {fromToNow} from "@/utils/date";

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

          <EnvironmentType value={depl.target_env_type} />
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

// TODO: make util for date range inputs
const from = (v: Date, filterValues: Dict<any>) => {
  if (!v || !filterValues.to || v <= filterValues.to) {
    return undefined;
  }
  return " ";
};

const to = (v: Date, filterValues: Dict<any>) => {
  if (!v || !filterValues.from || v >= filterValues.from) {
    return undefined;
  }
  return " ";
};

const DeploymentListFilter: React.FC<{
  alwaysOn?: boolean;
  envs: Environment[];
}> = ({envs}) => {
  return (
    <GridLayout xs={6} md={4} lg={3} columnSpacing={2}>
      <SelectInput
        label="Environment"
        source="env_type"
        validate={required()}
        choices={[{id: "_", environment_type: "All Environments"}, ...envs]}
        optionText={(deployment) => (
          <EnvironmentType value={deployment.environment_type!} />
        )}
        optionValue="environment_type"
        variant="outlined"
        fullWidth
        sx={COMMON_RA_SELECT_INPUT_SX_PROPS}
      />

      <SelectInput
        label="State"
        source="state"
        choices={makeSelectChoices(
          ["Any", "READY", "IN_PROGRESS", "FAILED"],
          "state"
        )}
        optionText={(deployment) => (
          <DeploymentState value={deployment.state!} />
        )}
        validate={required()}
        optionValue="state"
        alwaysOn
        variant="outlined"
        fullWidth
        sx={COMMON_RA_SELECT_INPUT_SX_PROPS}
      />

      <DateInput
        source="from"
        variant="outlined"
        validate={[from, maxValue(new Date())]}
        fullWidth
      />
      <DateInput source="to" variant="outlined" validate={to} fullWidth />
    </GridLayout>
  );
};

const ListToolbar = styled(RAListToolbar)({
  "display": "block",
  "& .RaFilter-form .filter-field": {
    width: "100%",
  },
});

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
      filterDefaultValues={{env_type: "All Environments", state: "Any"}}
    >
      <ListToolbar
        title=" "
        filters={
          <Filter>
            <DeploymentListFilter alwaysOn envs={envs} />
          </Filter>
        }
      />
      <DeploymentListView />

      <Box mt={2}>
        <Pagination />
      </Box>
    </ListBase>
  );
};
