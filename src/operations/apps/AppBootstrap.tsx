import {
  Form,
  SelectInput,
  BooleanInput,
  TextInput,
  NumberInput,
  Toolbar,
  SaveButton,
  Button,
  Link,
  Create,
  SimpleForm,
  Labeled,
} from "react-admin";
import {
  Stack,
  Box,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Divider,
} from "@mui/material";
import {Heading} from "@/components/head";
import {colors} from "@/themes";
import {makeSelectChoices} from "@/operations/utils/ra-props";

export const AppBootstrap: React.FC = () => {
  return (
    <Stack mb={2} p={2} justifyContent="center" width="100%" mx={0}>
      <Heading
        width={{xs: "100%", md: "60%"}}
        mb={4}
        title="Create New Application"
        subtitle="JCloudify enables you to effortlessly bootstrap a new application, which will be pushed to a GitHub repository of your choice. You can also directly import an existing Git repository."
      />

      <Form>
        <Stack spacing={3} width={{xs: "100%", md: "60%"}} mb={7}>
          <CreateGitRepository />
          <ApplicationMetadata />
          <Database />
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

const CreateGitRepository: React.FC = () => {
  return (
    <SectionCard title="Create Git Repository">
      <SelectInput
        variant="outlined"
        choices={makeSelectChoices(["Yume", "Not-Yume"])}
        source="scope"
        fullWidth
      />

      <TextInput
        variant="outlined"
        source="repository_name"
        placeholder="e.g: foo"
        fullWidth
      />

      <BooleanInput source="private" />
    </SectionCard>
  );
};

const ApplicationMetadata: React.FC = () => {
  return (
    <SectionCard title="Application Metadata">
      <TextInput variant="outlined" source="app_name" />

      <TextInput
        variant="outlined"
        source="package_full_name"
        placeholder="e.g: com.example.poja"
      />

      <TextInput
        variant="outlined"
        source="java_facade_it"
        label="Facade IT class name"
      />

      <NumberInput
        variant="outlined"
        source="jacoco_min_coverage"
        label="Min test coverage"
        defaultValue={80}
      />

      <BooleanInput source="with_gen_clients" />
    </SectionCard>
  );
};

const Database: React.FC = () => {
  return (
    <SectionCard title="Database">
      <SelectInput
        variant="outlined"
        choices={makeSelectChoices(["sqlite", "postgres"])}
        source="with_database"
        label="database"
        defaultValue="sqlite"
      />
    </SectionCard>
  );
};

const SectionCard: React.FC<
  React.PropsWithChildren<{title: string; subheader?: string}>
> = ({title, subheader, children}) => {
  return (
    <Card component={Box} width="100%" height="100%">
      <CardHeader
        component={Box}
        sx={{
          bgcolor: colors("gray"),
        }}
        title={
          <Typography variant="h6" fontWeight="575">
            {title}
          </Typography>
        }
        subheader={subheader}
      />

      <Divider sx={{borderColor: colors("gray-0")}} />

      <CardContent>
        <Stack py={3} px={2} width="100%" height="100%" direction="column">
          {children}
        </Stack>
      </CardContent>
    </Card>
  );
};
