import React from "react";
import {
  AppEnvDeployment,
  Environment,
  EnvironmentType as EnvironmentTypeEnum,
} from "@jcloudify-api/typescript-client";
import {
  Link,
  ListBase,
  ListToolbar as RAListToolbar,
  SelectInput,
  useGetList,
  useListContext,
  required,
  DateTimeInput,
  Filter,
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
import {SimpleListEmpty} from "@/operations/components/list/SimpleListEmpty";
import {Pagination} from "@/operations/components/list";
import {EnvironmentType} from "@/operations/environments";
import {JCBot} from "@/operations/github";
import {Dict, ToRecord} from "@/providers";
import {colors} from "@/themes";
import {GITHUB_URL_PREFIX} from "@/utils/constant";
import {fromToNow} from "@/utils/date";
import {useMediaQuery} from "usehooks-ts";

const DeploymentListItem: React.FC<{depl: ToRecord<AppEnvDeployment>}> = ({
  depl,
}) => {
  const isLarge = useMediaQuery("(min-width:1200px)");

  const committerLogin =
    depl.github_meta?.commit?.committer?.login ||
    depl.github_meta?.commit?.committer?.name;
  const is_jc_bot = !!depl.github_meta?.commit?.committer?.is_jc_bot;
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
        <Stack direction="row" spacing={0.5}>
          {isLarge && (
            <Typography variant="body2" fontSize="small">
              {new Date(depl.creation_datetime!).toISOString()}
            </Typography>
          )}
          <Typography color="text.secondary" fontSize="small" variant="body2">
            ({fromToNow(depl.creation_datetime!)})
          </Typography>
        </Stack>
      </Grid>

      <Grid item px={3}>
        <Box>
          <EnvironmentType
            value={
              depl.github_meta?.commit?.branch?.toUpperCase()! as EnvironmentTypeEnum
            }
          />
        </Box>
      </Grid>

      <Grid item xs>
        <Box zIndex={2} position="relative">
          <VCS {...depl.github_meta} showCommitMsg={isLarge} />
        </Box>
      </Grid>

      <Grid item xs>
        <Stack width="100%" direction="row" justifyContent="flex-start" px={3}>
          <span>by&nbsp;</span>

          {is_jc_bot ? (
            <JCBot />
          ) : (
            <Link
              aria-disabled={!!depl.github_meta?.commit?.committer?.is_jc_bot}
              to={GITHUB_URL_PREFIX + committerLogin}
              target="_blank"
              sx={{zIndex: 2, position: "relative", textDecoration: "none"}}
            >
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography fontWeight="510" sx={{display: "inline"}}>
                  {committerLogin}
                </Typography>
                <Avatar
                  src={depl.github_meta?.commit?.committer?.avatar_url}
                  sx={{
                    height: 20,
                    width: 20,
                    border: `1px solid ${colors("gray-1")}`,
                  }}
                />
              </Stack>
            </Link>
          )}
        </Stack>
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
  if (!data.length) {
    return <SimpleListEmpty />;
  }
  return (
    <Stack spacing={1} direction="column">
      {data.map((depl) => (
        <DeploymentListItem depl={depl} key={depl.id} />
      ))}
    </Stack>
  );
};

// TODO: make util for date range inputs
const from = (_date: Date, filters: Dict<any>) => {
  const {endDatetime: end, startDatetime: start} = filters;
  if (!start || !end || new Date(start) <= new Date(end)) {
    return undefined;
  }
  return " ";
};

const to = (_date: Date, filters: Dict<any>) => {
  const {endDatetime: end, startDatetime: start} = filters;
  if (!end || !start || new Date(end) >= new Date(start)) {
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
        source="envType"
        data-testid="env-type"
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

      <DateTimeInput
        source="startDatetime"
        variant="outlined"
        label="From"
        validate={from}
        fullWidth
      />
      <DateTimeInput
        source="endDatetime"
        variant="outlined"
        label="To"
        validate={to}
        fullWidth
      />
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
    filter: {
      appId,
    },
  });

  return (
    <ListBase
      resource="deployments"
      filter={{appId}}
      filterDefaultValues={{envType: "All Environments"}}
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
