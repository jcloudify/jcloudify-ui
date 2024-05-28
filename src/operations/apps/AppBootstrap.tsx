import {useState} from "react";
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
} from "react-admin";
import {Stack} from "@mui/material";
import {Heading} from "@/components/head";
import {ContainerWithHeading} from "@/components/container";
import {makeSelectChoices} from "@/operations/utils/ra-props";
import {PlanView} from "@/operations/plan";
import {Plan} from "@jcloudify-api/typescript-client";

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
          <ChoosePlan />
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

const ChoosePlan: React.FC = () => {
  const [_selectedPlan, setSelectedPlan] = useState("");
  const plans = [
    {
      name: "Hobby",
      cost: 0,
    },
    {
      name: "Pro",
      cost: 15,
    },
  ];

  const handleSelect = (plan: Plan) => {
    setSelectedPlan(plan.name!);
  };

  return (
    <ContainerWithHeading title="Choose Plan">
      <PlanView plans={plans} onSelect={handleSelect} />
    </ContainerWithHeading>
  );
};

const CreateGitRepository: React.FC = () => {
  return (
    <ContainerWithHeading
      title="Create Git Repository"
      subheader="The generated application code will be pushed to the specified repository."
    >
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
    </ContainerWithHeading>
  );
};

const ApplicationMetadata: React.FC = () => {
  return (
    <ContainerWithHeading title="Application Metadata">
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
        defaultValue="FacadeIT"
      />

      <NumberInput
        variant="outlined"
        source="jacoco_min_coverage"
        label="Min test coverage"
        defaultValue={80}
      />

      <BooleanInput source="with_gen_clients" />
    </ContainerWithHeading>
  );
};

const Database: React.FC = () => {
  return (
    <ContainerWithHeading title="Database">
      <SelectInput
        variant="outlined"
        choices={makeSelectChoices(["sqlite", "postgres"])}
        source="with_database"
        label="database"
        defaultValue="sqlite"
      />
    </ContainerWithHeading>
  );
};