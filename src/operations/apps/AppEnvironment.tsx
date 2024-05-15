import {useParams, useSearchParams} from "react-router-dom";
import {
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

  const env = p.get("env");

  const {appId} = useParams();

  const confTitle = env ? (
    <Typography variant="h5">
      Configure <b>{env}</b> env
    </Typography>
  ) : (
    "Configuration"
  );

  if (!appId) return null;
  return (
    <Stack mt={2.5} spacing={2} mb={2}>
      <Card>
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

      <Card component={Box}>
        <CardHeader title={confTitle} subheader="variables, machine, ..." />
        <Divider />
        <CardContent>
          {env ? (
            <EnvironmentVariablesEdit envId={env} />
          ) : (
            <NoEnvSelectedPlaceholder />
          )}
        </CardContent>
      </Card>
    </Stack>
  );
};

// {!selectedEnv && <NoEnvSelectedPlaceholder />}

const NoEnvSelectedPlaceholder = () => {
  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      p={4}
      sx={{bgcolor: colors("gray")}}
    >
      <Typography variant="h5" fontWeight="400">
        Click an Environment to configure
      </Typography>
      <Box p={3}>
        <Settings fontSize="large" />
      </Box>
    </Stack>
  );
};
