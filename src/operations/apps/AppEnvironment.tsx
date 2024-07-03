import {useState} from "react";
import {Environment} from "@jcloudify-api/typescript-client";
import {useGetList, useGetOne} from "react-admin";
import {useParams, useSearchParams} from "react-router-dom";
import {
  Grid,
  Box,
  Button,
  Fade,
  Stack,
  Divider,
  Card,
  CardHeader,
  CardContent,
  Typography,
} from "@mui/material";
import {Add as AddIcon, Settings} from "@mui/icons-material";
import {
  EnvironmentCreate,
  EnvironmentList,
  EnvironmentShow,
  EnvironmentVariablesEdit,
} from "@/operations/environments";
import {colors} from "@/themes";
import {WithTab} from "@/components/tab";

export const AppEnvironmentList: React.FC = () => {
  const [createEnv, setCreateEnv] = useState(false);

  const [p] = useSearchParams();

  const envId = p.get("env");

  const {data: env} = useGetOne<Required<Environment>>("environments", {
    id: envId!,
  });

  const {appId} = useParams();

  const {data: envList = []} = useGetList("environments", {
    meta: {application_id: appId},
  });

  if (!appId) return null;
  return (
    <Grid container spacing={2} mt={2.5}>
      <Grid item xs={12} lg={6}>
        <Card component={Box} flex={1} height="100%">
          <CardHeader
            title="Environments"
            subheader="Create or Delete an environment"
          />
          <Divider sx={{borderColor: colors("gray-0")}} />
          <CardContent>
            <EnvironmentList
              exporter={false}
              appId={appId}
              title=" "
              pagination={false}
            />
            <Box>
              <Divider sx={{my: 4}} />
              {createEnv ? (
                <EnvironmentCreate
                  envTypeList={envList.map(
                    ({environment_type}) => environment_type
                  )}
                  onCancel={() => {
                    setCreateEnv(false);
                  }}
                />
              ) : (
                <Fade in={!createEnv}>
                  <Box>
                    <Button
                      variant="contained"
                      startIcon={<AddIcon />}
                      onClick={() => setCreateEnv(true)}
                      disabled={envList?.length == 2}
                      data-testid="createEnv"
                    >
                      Create Env
                    </Button>
                    {envList?.length == 2 && (
                      <Typography variant="body2" mt={1}>
                        Available environments are already created
                      </Typography>
                    )}
                  </Box>
                </Fade>
              )}
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} lg={6}>
        <Card component={Box} height="100%">
          <CardHeader
            title={`"${env?.environment_type ?? "..."}" Env variables`}
          />
          <Divider />
          {envId ? (
            <CardContent>
              <EnvironmentVariablesEdit
                envId={envId}
                title=" "
                pagination={false}
              />
            </CardContent>
          ) : (
            <NoEnvSelectedPlaceholder />
          )}
        </Card>
      </Grid>
    </Grid>
  );
};

export const AppEnvironmentShow = () => {
  const {envId} = useParams();

  if (!envId) return;

  return (
    <WithTab tab="Environments">
      <EnvironmentShow envId={envId} />
    </WithTab>
  );
};

const NoEnvSelectedPlaceholder = () => {
  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      p={4}
      sx={{bgcolor: colors("gray")}}
      height="100%"
      width="100%"
    >
      <Typography variant="h5" fontWeight="400">
        Click an Environment to set variables
      </Typography>
      <Box p={3}>
        <Settings fontSize="large" />
      </Box>
    </Stack>
  );
};
