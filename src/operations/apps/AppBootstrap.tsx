import {GithubAppInstallation} from "@jcloudify-api/typescript-client";
import {
  CreateBase,
  Form,
  BooleanInput,
  TextInput,
  Toolbar,
  SaveButton,
  Button,
  Link,
  required,
  Title,
  useGetList,
  useInput,
} from "react-admin";
import {
  FormHelperText,
  Stack,
  Box,
  Select,
  MenuItem,
  FormControl,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import {GitHub, Add} from "@mui/icons-material";
import {nanoid} from "nanoid";
import {useLocation} from "react-router-dom";
import {useFormContext} from "react-hook-form";
import {Heading} from "@/components/head";
import {ContainerWithHeading} from "@/components/container";
import {GridLayout} from "@/components/grid";
import {Divider} from "@/components/divider";
import {ToRecord, appCreateCache} from "@/providers";
import {gh} from "@/config/env";
import {redirect} from "@/utils/redirect";

export const AppBootstrap: React.FC = () => {
  const {state: appCreateState = {}} = useLocation();

  return (
    <Stack mb={2} p={2} justifyContent="center" width="100%" mx={0}>
      <Title title="App" />

      <Heading
        title="Create New Application"
        subtitle="JCloudify enables you to effortlessly bootstrap a new application, which will be pushed to a GitHub repository of your choice once your create an environment for it."
        mb={4}
        size="sm"
        p={1}
      />

      <CreateBase resource="applications">
        <Form defaultValues={{...appCreateState, id: nanoid()}}>
          <Stack spacing={3} width={{xs: "100%", md: "60%"}} mb={7}>
            <AppInfo />
            <CreateGitRepository />
          </Stack>

          <Toolbar sx={{mt: 2}}>
            <Stack direction="row" spacing={2}>
              <SaveButton />
              <Button
                label="Return to applications"
                variant="outlined"
                to="/applications"
                component={Link}
              />
            </Stack>
          </Toolbar>
        </Form>
      </CreateBase>
    </Stack>
  );
};

const AppInfo = () => {
  return (
    <ContainerWithHeading
      title="App Info"
      subheader="The generated application code will be pushed to the specified repository."
    >
      <GridLayout xs={12} md={6} lg={4} spacing={2} alignItems="center">
        <TextInput
          variant="outlined"
          source="name"
          placeholder="e.g: foo"
          size="medium"
          validate={required()}
          fullWidth
        />
      </GridLayout>
    </ContainerWithHeading>
  );
};

const CreateGitRepository: React.FC = () => {
  const {data: appInstallations = []} = useGetList<
    ToRecord<GithubAppInstallation>
  >("githubAppInstallation");
  const {field} = useInput({
    source: "github_repository.installation_id",
    defaultValue: appInstallations[0]?.gh_installation_id,
  });

  return (
    <ContainerWithHeading
      title="Create Git Repository"
      subheader="The generated application code will be pushed to the specified repository."
    >
      <GridLayout xs={12} md={6} lg={4} spacing={2} alignItems="center">
        <FormControl
          data-testid="select-installation-id"
          variant="outlined"
          sx={{width: "100%", height: "100%"}}
        >
          <Select fullWidth size="medium" {...field}>
            {appInstallations.map((installation) => (
              <MenuItem
                value={installation.id}
                key={`installation-${installation.id}`}
              >
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Box>
                    <GitHub />
                  </Box>

                  <Box flex={1}>{installation.owner}</Box>
                </Stack>
              </MenuItem>
            ))}
            <Divider />
            <AddNamespaceMenuItem />
          </Select>
          <FormHelperText>
            <span>&#8203;</span>
          </FormHelperText>
        </FormControl>

        <TextInput
          variant="outlined"
          label="Name"
          source="github_repository.name"
          placeholder="e.g: foo"
          size="medium"
          validate={required()}
          fullWidth
        />

        <TextInput
          variant="outlined"
          label="Description"
          source="github_repository.description"
          placeholder="e.g: foo"
          size="medium"
          validate={required()}
          fullWidth
        />

        <BooleanInput label="Private" source="github_repository.is_private" />
      </GridLayout>
    </ContainerWithHeading>
  );
};

const AddNamespaceMenuItem = () => {
  const {getValues} = useFormContext();

  const addNewNamespace = () => {
    appCreateCache.replace(getValues());
    redirect(gh.installationLink);
  };

  return (
    <MenuItem onClick={addNewNamespace}>
      <ListItemIcon>
        <Add />
      </ListItemIcon>
      <ListItemText>Add Github Account</ListItemText>
    </MenuItem>
  );
};
