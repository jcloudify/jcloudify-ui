import {useGetOne} from "react-admin";
import {useParams, useSearchParams} from "react-router-dom";
import {
  Grid,
  Box,
  Stack,
  Divider,
  Card,
  CardHeader,
  CardContent,
  Typography,
} from "@mui/material";
import {Settings} from "@mui/icons-material";
import {
  EnvironmentList,
  EnvironmentVariablesEdit,
} from "@/operations/environments";
import {colors} from "@/themes";

export const AppEnvironment: React.FC = () => {
  const [p] = useSearchParams();

  const envId = p.get("env");

  const {data: env} = useGetOne("environments", {id: envId});
  const {appId} = useParams();

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
              hasCreate
              exporter={false}
              appId={appId}
              title=" "
              pagination={false}
            />
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} lg={6}>
        <Card component={Box} minWidth="40rem" height="100%">
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
