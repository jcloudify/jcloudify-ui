import React from "react";
import {ShowBase, TextField, BooleanField, useRecordContext} from "react-admin";
import {Stack} from "@mui/material";
import {Heading} from "@/components/head";
import {Divider} from "@/components/divider";
import {GridLayout} from "@/components/grid";
import {ShowLayout} from "@/operations/components/show";
import {PasswordField, renderWithLabel} from "@/operations/components/field";
import {Environment} from "@jcloudify-api/typescript-client";

export const EnvironmentConfShow: React.FC<{envId: string}> = ({envId}) => {
  return (
    <ShowBase resource="environments" id={envId}>
      <ShowLayout>
        <Stack gap={1.5}>
          <MetadataConf />
          <Divider />

          <EmailConf />
          <Divider />

          <ComputeConf />
          <Divider />

          <ConcurrencyConf />
          <Divider />

          <DBConf />
          <Divider />

          <GenClientConf />
          <Divider />

          <IntegrationConf />
        </Stack>
      </ShowLayout>
    </ShowBase>
  );
};

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
      <BooleanField label="CodeQL" source="conf.with_codeql" />
      <BooleanField label="Sonar" source="conf.with_sonar" />
      <BooleanField label="Sentry" source="conf.with_sentry" />
      <BooleanField label="Swagger UI" source="conf.with_swagger_ui" />
    </GridLayout>
  </Stack>
);

const MetadataConf = () => (
  <Stack>
    <Heading size="sm" title="Metadata" mb={2} />
    <GridLayout xs={12} md={6} lg={4} spacing={2} render={renderWithLabel}>
      <TextField label="Package name" source="conf.package_full_name" />
      <TextField label="Java Facade IT" source="conf.java_facade_it" />
      <TextField
        label="Jacoco Min Coverage"
        source="conf.jacoco_min_coverage"
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
      <TextField label="Frontal Memory" source="conf.compute.frontal_memory" />
      <TextField label="Worker Memory" source="conf.compute.worker_memory" />
      <TextField label="Worker Batch" source="conf.compute.worker_batch" />
    </GridLayout>
  </Stack>
);

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
        source="conf.concurrency.frontal_reserved_concurrent_executions_nb"
      />
      <TextField
        label="Worker Reserved Concurrent Executions NB"
        source="conf.concurrency.worker_reserved_concurrent_executions_nb"
      />
    </GridLayout>
  </Stack>
);

const DBConf = () => {
  const record = useRecordContext<Environment>();
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
        <TextField label="DB" source="conf.with_database" />
        <TextField
          label="Non Root Username"
          source="conf.database.database_non_root_username"
        />
        <PasswordField
          label="Non Root Password"
          source="conf.database.database_non_root_password"
        />
        <TextField
          label="Prod DB Cluster Timeout"
          source="conf.database.prod_db_cluster_timeout"
        />
      </GridLayout>

      {record.conf?.with_database === "aurora-postgres" && (
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
            source="conf.aurora.aurora_min_capacity"
          />
          <TextField
            label="Aurora Max Capacity"
            source="conf.aurora.aurora_max_capacity"
          />
          <TextField
            label="Aurora Scale Point"
            source="conf.aurora.aurora_scale_point"
          />
          <TextField label="Aurora Sleep" source="conf.aurora.aurora_sleep" />
          <BooleanField
            label="Aurora Auto Pause"
            source="conf.aurora.aurora_auto_pause"
          />
        </GridLayout>
      )}
    </Stack>
  );
};

const EmailConf = () => (
  <Stack>
    <Heading size="sm" title="Emailing" mb={2} />
    <GridLayout xs={12} md={6} lg={4} spacing={2} render={renderWithLabel}>
      <TextField label="SES source (mail)" source="conf.ses_source" />
    </GridLayout>
  </Stack>
);

const GenClientConf = () => {
  const record = useRecordContext<Environment>();
  return (
    <Stack>
      <Heading
        size="sm"
        title="Gen API Client"
        subtitle={record.conf?.with_gen_clients ? "" : "disabled"}
      />

      {record.conf?.with_gen_clients && (
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
            source="conf.client.ts_client_default_openapi_server_url"
          />
          <TextField
            label="API URL Env Var name"
            source="conf.client.ts_client_api_url_env_var_name"
          />
          <BooleanField
            label="Publish to npm registry"
            source="conf.with_publish_to_npm_registry"
          />
        </GridLayout>
      )}
    </Stack>
  );
};
