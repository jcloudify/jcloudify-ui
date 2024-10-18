import {
  EnvironmentType as EnvironmentTypeEnum,
  GithubAppInstallation,
  Application,
} from "@jcloudify-api/typescript-client";
import {useMemo} from "react";
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
  useNotify,
  useCreate,
  Loading,
  useRedirect,
  useDataProvider,
} from "react-admin";
import {
  FormHelperText,
  Typography,
  Stack,
  Box,
  Select,
  Dialog,
  DialogTitle,
  DialogContent,
  MenuItem,
  FormControl,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import {GitHub, Add} from "@mui/icons-material";
import {nanoid} from "nanoid";
import {useFormContext} from "react-hook-form";
import {Heading} from "@/components/head";
import {ContainerWithHeading} from "@/components/container";
import {GridLayout} from "@/components/grid";
import {Divider} from "@/components/divider";
import {typoSizes} from "@/components/typo";
import {ToRecord, appCreateCache} from "@/providers";
import {gh} from "@/config/env";
import {redirect} from "@/utils/redirect";
import {getPojaVersionedComponent} from "@/operations/environments/poja-conf-form/poja-conf-record";

export const AppBootstrap: React.FC = () => {
  const redirect = useRedirect();
  const notify = useNotify();

  const newAppId = useMemo(() => nanoid(), []);
  const newEnvironmentId = useMemo(() => nanoid(), []);

  const [create, {isLoading: isCreatingProductionEnvironment}] = useCreate();

  const dataProvider = useDataProvider();

  const {formTransformFormValues, formDefaultValues} =
    getPojaVersionedComponent("3.6.2" /* version */);

  const createProductionEnvironment = async () => {
    const {data: createdApp} = await dataProvider.getOne<ToRecord<Application>>(
      "applications",
      {
        id: newAppId,
      }
    );
    await create(
      "environments",
      {
        meta: {
          appId: newAppId,
          ownerId: newEnvironmentId,
        },
        data: formTransformFormValues(
          {
            to_create: {
              id: newEnvironmentId,
              environment_type: EnvironmentTypeEnum.PROD,
              archived: false,
            },
            ...(formDefaultValues || {}),
          },
          createdApp
        ),
      },
      {
        onSuccess: () => {
          notify("Production environment created successfully.", {
            type: "success",
          });
          redirect(
            `/applications/${newAppId}/show/environments/${newEnvironmentId}`
          );
        },
        onError: (e: any) => {
          notify(e.message, {type: "error"});
        },
      }
    );
  };

  return (
    <Stack mb={2} p={2} justifyContent="center" width="100%" mx={0}>
      <Title title="App" />

      <Heading
        title="Create New Application"
        subtitle={
          <Typography variant={typoSizes.sm.secondary} color="text.secondary">
            JCloudify enables you to effortlessly bootstrap a new app that will
            be pushed to the repository of your choice and deployed to a{" "}
            <b>Production-ready</b> environment.
          </Typography>
        }
        mb={4}
        size="sm"
        p={1}
      />

      <CreateBase
        resource="applications"
        mutationOptions={{
          onSuccess: () => {
            void createProductionEnvironment();
          },
        }}
      >
        <Form
          disabled={isCreatingProductionEnvironment}
          defaultValues={{id: newAppId, package_name: "com.example.demo"}}
        >
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

      <Dialog open={isCreatingProductionEnvironment}>
        <DialogTitle>Setting up the Production environment</DialogTitle>
        <DialogContent>
          <Loading loadingPrimary="" loadingSecondary="" />
        </DialogContent>
      </Dialog>
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

        <TextInput
          variant="outlined"
          label="Package name"
          source="package_name"
          placeholder="e.g: com.example.demo"
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
