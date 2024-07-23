import {
  Form,
  SelectInput,
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
import {Heading} from "@/components/head";
import {ContainerWithHeading} from "@/components/container";
import {GridLayout} from "@/components/grid";
import {makeSelectChoices} from "@/operations/utils/ra-props";

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

      <Form>
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
        <SelectInput
          variant="outlined"
          choices={makeSelectChoices(["Yume", "Not-Yume"])}
          source="scope"
          validate={required()}
          label="Scope (org/user)"
          size="medium"
          fullWidth
        />
        <TextInput
          variant="outlined"
          source="repository_name"
          placeholder="e.g: foo"
          size="medium"
          fullWidth
        />

        <BooleanInput source="private" />
      </GridLayout>
    </ContainerWithHeading>
  );
};
