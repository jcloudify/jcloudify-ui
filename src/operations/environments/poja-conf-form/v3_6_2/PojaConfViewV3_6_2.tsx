import {ShowBase, TextField, BooleanField, useRecordContext} from "react-admin";
import {
  Stack,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import {ExpandMore} from "@mui/icons-material";
import {Heading} from "@/components/head";
import {Divider} from "@/components/divider";
import {GridLayout} from "@/components/grid";
import {ShowLayout} from "@/operations/components/show";
import {
  PasswordField,
  RecordField,
  StringArrayField,
  renderWithLabel,
} from "@/operations/components/field";
import {PojaConfViewComponent} from "@/operations/environments/poja-conf-form";
import {
  DatabaseConf1WithDatabaseEnum,
  PojaConf1,
  WithQueuesNbEnum,
} from "@jcloudify-api/typescript-client";

export const PojaConfViewV3_6_2: PojaConfViewComponent = ({
  targetId,
  targetResource,
  appId,
}) => {
  return (
    <ShowBase
      resource="pojaConf"
      id={targetId}
      queryOptions={{
        meta: {
          appId,
          targetResource,
        },
      }}
    >
      <ShowLayout>
        <Stack gap={1.5}>
          <PojaConfVersion />
          <Divider />

          <GeneralConf />
          <Divider />

          <MailingConf />
          <Divider />

          <TestingConf />
          <Divider />

          <ComputeConf />
          <Divider />

          <DBConf />
          <Divider />

          <GenAPIClient />
          <Divider />

          <IntegrationConf />
        </Stack>
      </ShowLayout>
    </ShowBase>
  );
};

const PojaConfVersion = () => (
  <Stack>
    <Heading size="sm" title="Version" mb={1} />
    <Chip
      size="small"
      label={
        <Typography variant="body2">
          <TextField source="version" />
        </Typography>
      }
      variant="filled"
      sx={{
        width: "fit-content",
        bgcolor: "gray",
        color: "#fff",
      }}
    />
  </Stack>
);

const GeneralConf = () => (
  <Stack>
    <Heading size="sm" title="General" mb={2} />
    <GridLayout
      mb={2}
      xs={12}
      md={6}
      lg={4}
      spacing={2}
      render={renderWithLabel}
    >
      <TextField label="Package name" source="general.package_full_name" />
      <BooleanField label="Snapstart" source="general.with_snapstart" />
    </GridLayout>

    <Accordion
      data-testid="custom_java_env_vars_accordion"
      sx={{
        "&::before": {
          display: "none",
        },
        "mb": 2,
      }}
    >
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography variant="body1" fontSize={12}>
          Custom Java Environment Variables
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <RecordField
          name="custom_java_env_vars"
          source="general.custom_java_env_vars"
          kvLabels={["Name", "Value"]}
        />
      </AccordionDetails>
    </Accordion>

    <Accordion
      data-testid="custom_java_repositories_accordion"
      sx={{
        "&::before": {
          display: "none",
        },
        "mb": 2,
      }}
    >
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography variant="body1" fontSize={12}>
          Custom Java Repositories
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <StringArrayField
          name="custom_java_repositories"
          source="general.custom_java_repositories"
        />
      </AccordionDetails>
    </Accordion>

    <Accordion
      data-testid="custom_java_deps_accordion"
      sx={{
        "&::before": {
          display: "none",
        },
        "mb": 2,
      }}
    >
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography variant="body1" fontSize={12}>
          Custom Java Dependencies
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <StringArrayField
          name="custom_java_deps"
          source="general.custom_java_deps"
        />
      </AccordionDetails>
    </Accordion>
  </Stack>
);

const IntegrationConf = () => (
  <Stack>
    <Heading size="sm" title="Integration" mb={2} />
    <GridLayout
      xs={12}
      md={6}
      lg={4}
      spacing={2}
      alignItems="center"
      render={renderWithLabel}
    >
      <BooleanField label="CodeQL" source="integration.with_codeql" />
      <BooleanField label="Sonar" source="integration.with_sonar" />
      <BooleanField label="Sentry" source="integration.with_sentry" />
      <BooleanField label="Swagger UI" source="integration.with_swagger_ui" />
      <BooleanField
        label="File Storage"
        source="integration.with_file_storage"
      />
    </GridLayout>
  </Stack>
);

const GenAPIClient = () => {
  const {gen_api_client} = useRecordContext<PojaConf1>()!;
  const isEnabled = !!(
    gen_api_client?.ts_client_api_url_env_var_name ||
    gen_api_client?.ts_client_default_openapi_server_url
  );
  return (
    <Stack>
      <Heading
        size="sm"
        title="Gen API Client"
        subtitle={isEnabled ? "" : "disabled"}
      />

      {isEnabled && (
        <GridLayout
          xs={12}
          md={6}
          lg={4}
          spacing={2}
          rowSpacing={0.5}
          alignItems="center"
          render={renderWithLabel}
        >
          <TextField
            label="Default OpenAPI Server URL"
            source="gen_api_client.ts_client_default_openapi_server_url"
          />
          <TextField
            label="API URL Env Var name"
            source="gen_api_client.ts_client_api_url_env_var_name"
          />
          <BooleanField
            label="Publish to npm registry"
            source="gen_api_client.with_publish_to_npm_registry"
          />
        </GridLayout>
      )}
    </Stack>
  );
};

const ComputeConf = () => {
  const conf = useRecordContext<PojaConf1>();
  const queuesNB = conf?.general?.with_queues_nb;

  return (
    <Stack>
      <Heading size="sm" title="Compute" mb={2} />
      <GridLayout
        xs={12}
        md={6}
        lg={4}
        spacing={2}
        rowSpacing={0.5}
        render={renderWithLabel}
      >
        <TextField label="Frontal Memory" source="compute.frontal_memory" />
        <TextField
          label="Frontal Function Timeout"
          source="compute.frontal_function_timeout"
        />
        <TextField label="Queues NB" source="general.with_queues_nb" />
      </GridLayout>

      {!!queuesNB && (
        <GridLayout
          xs={12}
          md={6}
          lg={4}
          spacing={2}
          rowSpacing={0.5}
          render={renderWithLabel}
        >
          <TextField label="Worker Memory" source="compute.worker_memory" />
          <TextField label="Worker Batch" source="compute.worker_batch" />
          <TextField
            label="Worker Function 1 Timeout"
            source="compute.worker_function_1_timeout"
          />

          {queuesNB === WithQueuesNbEnum.NUMBER_2 && (
            <TextField
              label="Worker Function 2 Timeout"
              source="compute.worker_function_2_timeout"
            />
          )}
        </GridLayout>
      )}
    </Stack>
  );
};

const MailingConf = () => (
  <Stack>
    <Heading size="sm" title="Emailing" mb={2} />
    <GridLayout xs={12} md={6} lg={4} spacing={2} render={renderWithLabel}>
      <TextField label="SES source (mail)" source="emailing.ses_source" />
    </GridLayout>
  </Stack>
);

const TestingConf = () => (
  <Stack>
    <Heading size="sm" title="Testing" mb={2} />
    <GridLayout
      xs={12}
      md={6}
      lg={4}
      spacing={2}
      alignItems="center"
      render={renderWithLabel}
    >
      <TextField label="Java Facade IT" source="testing.java_facade_it" />
      <TextField
        label="Jacoco Min Coverage"
        source="testing.jacoco_min_coverage"
      />
    </GridLayout>
  </Stack>
);

const DBConf = () => {
  const record = useRecordContext<PojaConf1>();
  const isAurora =
    record?.database?.with_database ===
    DatabaseConf1WithDatabaseEnum.AURORA_POSTGRES;

  return (
    <Stack>
      <Heading size="sm" title="DB" mb={2} />
      <GridLayout
        xs={12}
        md={6}
        lg={4}
        spacing={2}
        rowSpacing={0.5}
        render={renderWithLabel}
      >
        <TextField label="DB" source="database.with_database" />
      </GridLayout>

      {isAurora && (
        <GridLayout
          xs={12}
          md={6}
          lg={4}
          spacing={2}
          alignItems="center"
          rowSpacing={0.5}
          render={renderWithLabel}
        >
          <TextField
            label="Non Root Username"
            source="database.database_non_root_username"
          />
          <PasswordField
            label="Non Root Password"
            source="database.database_non_root_password"
          />
          <TextField
            label="Prod DB Cluster Timeout"
            source="database.prod_db_cluster_timeout"
          />
          <TextField
            label="Aurora Min Capacity"
            source="database.aurora_min_capacity"
          />
          <TextField
            label="Aurora Max Capacity"
            source="database.aurora_max_capacity"
          />
          <TextField
            label="Aurora Scale Point"
            source="database.aurora_scale_point"
          />
          <TextField label="Aurora Sleep" source="database.aurora_sleep" />
          <BooleanField
            label="Aurora Auto Pause"
            source="database.aurora_auto_pause"
          />
        </GridLayout>
      )}
    </Stack>
  );
};
