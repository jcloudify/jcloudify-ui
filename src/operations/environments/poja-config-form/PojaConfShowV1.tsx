import React from "react";
import {ShowBase, TextField, BooleanField, useRecordContext} from "react-admin";
import {
  Stack,
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
import {
  DatabaseConf1WithDatabaseEnum,
  PojaConf1,
} from "@jcloudify-api/typescript-client";

export const PojaConfShowV1: React.FC<{envId: string; appId: string}> = ({
  envId,
  appId,
}) => {
  return (
    <ShowBase
      resource="pojaConf"
      id={envId}
      queryOptions={{
        meta: {
          appId,
        },
      }}
    >
      <ShowLayout>
        <Stack gap={1.5}>
          <GeneralConf />
          <Divider />

          <MailingConf />
          <Divider />

          <TestingConf />
          <Divider />

          <ComputeConf />
          <Divider />

          <ConcurrencyConf />
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
      <TextField label="Queues NB" source="general.with_queues_nb" />
      <BooleanField label="Snapstart" source="general.with_snapstart" />
    </GridLayout>

    <Accordion
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
          source="general.custom_java_env_vars"
          kvLabels={["Name", "Value"]}
        />
      </AccordionDetails>
    </Accordion>

    <Accordion
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
        <StringArrayField source="general.custom_java_repositories" />
      </AccordionDetails>
    </Accordion>

    <Accordion
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
        <StringArrayField source="general.custom_java_deps" />
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
    </GridLayout>
  </Stack>
);

const GenAPIClient = () => {
  const record = useRecordContext<PojaConf1>();
  return (
    <Stack>
      <Heading
        size="sm"
        title="Gen API Client"
        subtitle={record.gen_api_client ? "" : "disabled"}
      />

      {record.gen_api_client && (
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

const ConcurrencyConf = () => (
  <Stack>
    <Heading size="sm" title="Concurrency" mb={2} />
    <GridLayout
      xs={12}
      md={6}
      lg={4}
      spacing={2}
      rowSpacing={0.5}
      render={renderWithLabel}
    >
      <TextField
        label="Frontal Reserved Concurrent Executions NB"
        source="concurrency.frontal_reserved_concurrent_executions_nb"
      />
      <TextField
        label="Worker Reserved Concurrent Executions NB"
        source="concurrency.worker_reserved_concurrent_executions_nb"
      />
    </GridLayout>
  </Stack>
);

const ComputeConf = () => (
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
      <TextField label="Worker Memory" source="compute.worker_memory" />
      <TextField label="Worker Batch" source="compute.worker_batch" />
      <TextField
        label="Worker Function 1 Timeout"
        source="compute.worker_function_1_timeout"
      />
      <TextField
        label="Worker Function 2 Timeout"
        source="compute.worker_function_2_timeout"
      />
    </GridLayout>
  </Stack>
);

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
      </GridLayout>

      {record.database?.with_database ===
        DatabaseConf1WithDatabaseEnum.AURORA_POSTGRES && (
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
