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
} from "react-admin";
import {Stack} from "@mui/material";
import {nanoid} from "nanoid";
import {Heading} from "@/components/head";
import {ContainerWithHeading} from "@/components/container";
import {GridLayout} from "@/components/grid";

export const AppBootstrap: React.FC = () => {
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
        <Form defaultValues={{id: nanoid()}}>
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

const AppInfo = () => (
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

const CreateGitRepository: React.FC = () => {
  return (
    <ContainerWithHeading
      title="Create Git Repository"
      subheader="The generated application code will be pushed to the specified repository."
    >
      <GridLayout xs={12} md={6} lg={4} spacing={2} alignItems="center">
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
