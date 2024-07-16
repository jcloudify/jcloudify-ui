import {useState} from "react";
import {Environment} from "@jcloudify-api/typescript-client";
import {Button, useGetList} from "react-admin";
import {useNavigate} from "react-router-dom";
import {Stack, Box, Paper, Select, MenuItem} from "@mui/material";
import {Heading} from "@/components/head";
import {GridLayout} from "@/components/grid";
import {ToRecord} from "@/providers";

export const EnvironmentCreation: React.FC<{appId: string}> = ({appId}) => {
  const [templateId, setTemplateId] = useState<string>();

  const navigate = useNavigate();

  const {data: envs = []} = useGetList<ToRecord<Environment>>("environments", {
    meta: {
      application_id: appId,
    },
  });

  const navigateToCreateEnv = () => {
    const environment = envs.find((env) => env.id === templateId);

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
              onChange={(ev) => setTemplateId(ev.target.value as string)}
            >
              {envs.map((env) => (
                <MenuItem key={env.id} value={env.id}>
                  {env.id}
                </MenuItem>
              ))}
            </Select>

            <Box>
              <Button
                disabled={!templateId}
                onClick={navigateToCreateEnv}
                label="Create"
                variant="outlined"
                size="medium"
              />
            </Box>
          </Stack>
        </GridLayout>
      </Box>
    </Stack>
  );
};
