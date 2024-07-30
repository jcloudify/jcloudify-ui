import {useState} from "react";
import {Button} from "react-admin";
import {useNavigate} from "react-router-dom";
import {Stack, Box, Paper, Select, MenuItem, Alert} from "@mui/material";
import {Heading} from "@/components/head";
import {GridLayout} from "@/components/grid";
import {
  EnvironmentType,
  useEnvironmentCreation,
} from "@/operations/environments";

export const EnvironmentCreation: React.FC<{appId: string}> = ({appId}) => {
  const [templateId, setTemplateId] = useState<string>();

  const navigate = useNavigate();

  const {created: createdEnvironments, canCreateMore} =
    useEnvironmentCreation(appId);

  const navigateToCreateEnv = () => {
    const environment = createdEnvironments.find(
      (env) => env.id === templateId
    );

    navigate(`/applications/${appId}/show/environments/create`, {
      state: environment,
    });
  };

  return (
    <Stack mt={4} mb={3} spacing={3} width={{lg: "60%"}}>
      <Heading
        title="Environment Creation"
        subtitle="Creating a New Environment for your App"
        p={2}
        size="sm"
      />

      {!canCreateMore && (
        <Alert severity="error">
          All available environments have been already created, so it's not
          possible to create more at this time.
        </Alert>
      )}

      <Box>
        <GridLayout xs={6} spacing={1.5}>
          <Stack component={Paper} p={2} height="100%">
            <Heading title="New" subtitle="Create from scratch" size="sm" />

            <Box>
              <Button
                onClick={navigateToCreateEnv}
                label="Create"
                variant="outlined"
                size="medium"
                disabled={!canCreateMore}
                data-testid="CreateFromScratch"
              />
            </Box>
          </Stack>

          <Stack component={Paper} p={2} spacing={2} height="100%">
            <Heading
              title="From an Existing"
              subtitle="Create an environment from an existing one"
              size="sm"
            />

            <Select
              size="small"
              variant="outlined"
              id="select-creation-template"
              onChange={(ev) => setTemplateId(ev.target.value as string)}
              disabled={!createdEnvironments.length || !canCreateMore}
            >
              {createdEnvironments.map((env) => (
                <MenuItem key={env.id} value={env.id}>
                  <EnvironmentType value={env.environment_type!} />
                </MenuItem>
              ))}
            </Select>

            <Box>
              <Button
                disabled={!templateId || !canCreateMore}
                onClick={navigateToCreateEnv}
                label="Create"
                variant="outlined"
                size="medium"
                data-testid="CreateFromExisting"
              />
            </Box>
          </Stack>
        </GridLayout>
      </Box>
    </Stack>
  );
};
