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
  useCreatePath,
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
import {colors} from "@/themes";
import {makeSelectChoices} from "@/operations/utils/ra-props";

export const AppCreateFromScratch: React.FC = () => {
  const createPath = useCreatePath();
  return (
    <Stack mt={2.5} mb={2} pt={2} justifyContent="center" width="100%" mx={0}>
      <Form>
        <Grid container spacing={2}>
          <Grid item md={6} width="100%">
            <CreateGitRepository />
          </Grid>
          <Grid item md={6} width="100%">
            <ApplicationMetadata />
          </Grid>
          <Grid item md={6} width="100%">
            <Database />
          </Grid>
        </Grid>

        <Toolbar sx={{mt: 2}}>
          <Stack direction="row" spacing={2}>
            <SaveButton />
            <Button
              size="medium"
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
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <SelectInput
            size="medium"
            variant="outlined"
            choices={makeSelectChoices(["Yume", "Not-Yume"])}
            source="scope"
          />
        </Grid>

        <Grid item xs={6}>
          <TextInput
            size="medium"
            variant="outlined"
            source="repository_name"
            placeholder="e.g: foo"
          />
        </Grid>

        <Grid item xs>
          <BooleanInput source="private" />
        </Grid>
      </Grid>
    </SectionCard>
  );
};

const ApplicationMetadata: React.FC = () => {
  return (
    <SectionCard title="Application Metadata">
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextInput size="medium" variant="outlined" source="app_name" />
        </Grid>

        <Grid item xs={6}>
          <TextInput
            size="medium"
            variant="outlined"
            source="package_full_name"
            placeholder="e.g: com.example.poja"
          />
        </Grid>

        <Grid item xs={6}>
          <TextInput size="medium" variant="outlined" source="java_facade_it" />
        </Grid>

        <Grid item xs={6}>
          <NumberInput
            size="medium"
            variant="outlined"
            source="jacoco_min_coverage"
            defaultValue={80}
          />
        </Grid>

        <Grid item xs={6}>
          <BooleanInput source="with_gen_clients" />
        </Grid>
      </Grid>
    </SectionCard>
  );
};

const Database: React.FC = () => {
  return (
    <SectionCard title="Database">
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <SelectInput
            size="medium"
            variant="outlined"
            choices={makeSelectChoices(["sqlite", "postgres"])}
            source="with_database"
            label="database"
            defaultValue="sqlite"
          />
        </Grid>
      </Grid>
    </SectionCard>
  );
};

const SectionCard: React.FC<
  React.PropsWithChildren<{title: string; subheader?: string}>
> = ({title, subheader, children}) => {
  return (
    <Card component={Box} pt={1} width="100%" height="100%">
      <CardHeader
        title={
          <Typography variant="h5" fontWeight="575">
            {title}
          </Typography>
        }
        subheader={subheader}
      />
      <CardContent>
        <Divider sx={{borderColor: colors("gray-0")}} />
        <Box py={3} px={2} width="100%" height="100%">
          {children}
        </Box>
      </CardContent>
    </Card>
  );
};
