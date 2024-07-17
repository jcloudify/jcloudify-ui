import React from "react";
import {
  EditBase,
  Form,
  SaveButton,
  TextInput,
  SelectInput,
  BooleanInput,
  Toolbar,
} from "react-admin";
import {useFormContext} from "react-hook-form";
import {Stack} from "@mui/material";
import {Heading} from "@/components/head";
import {GridLayout} from "@/components/grid";
import {TitleWithToggle} from "@/operations/components/head";
import {makeSelectChoices} from "@/operations/utils/ra-props";

export interface EnvironmentConfEditProps {
  envId: string;
  onEdited: () => void;
}

export const EnvironmentConfEdit: React.FC<EnvironmentConfEditProps> = ({
  envId,
  onEdited,
}) => {
  return (
    <EditBase
      resource="environments"
      id={envId}
      mutationOptions={{
        onSuccess: onEdited,
      }}
      redirect={false}
    >
      <Form>
        <EnvironmentConfFormFields />
        <Toolbar sx={{mt: 2}}>
          <Stack direction="row" spacing={2}>
            <SaveButton />
          </Stack>
        </Toolbar>
      </Form>
    </EditBase>
  );
};

export const EnvironmentConfFormFields: React.FC = () => (
  <Stack gap={1.5}>
    <MetadataConf />
    <EmailConf />
    <ComputeConf />
    <ConcurrencyConf />
    <DBConf />
    <GenClientConf />
    <IntegrationConf />
  </Stack>
);

const IntegrationConf = () => (
  <Stack>
    <Heading size="sm" title="Integration" mb={2} />
    <GridLayout xs={12} md={6} lg={4} spacing={2} alignItems="center">
      <BooleanInput
        label="CodeQL"
        source="conf.with_codeql"
        variant="outlined"
        size="medium"
        fullWidth
      />
      <BooleanInput
        label="Sonar"
        source="conf.with_sonar"
        variant="outlined"
        size="medium"
        fullWidth
      />
      <BooleanInput
        label="Sentry"
        source="conf.with_sentry"
        variant="outlined"
        size="medium"
        fullWidth
      />
      <BooleanInput
        label="Swagger UI"
        source="conf.with_swagger_ui"
        variant="outlined"
        size="medium"
        fullWidth
      />
    </GridLayout>
  </Stack>
);

const MetadataConf = () => (
  <Stack>
    <Heading size="sm" title="Metadata" mb={2} />
    <GridLayout xs={12} md={6} lg={4} spacing={2}>
      <TextInput
        label="Package name"
        source="conf.package_full_name"
        variant="outlined"
        size="medium"
        fullWidth
      />
      <TextInput
        label="Java Facade IT"
        source="conf.java_facade_it"
        variant="outlined"
        size="medium"
        fullWidth
      />
      <TextInput
        label="Jacoco Min Coverage"
        source="conf.jacoco_min_coverage"
        variant="outlined"
        size="medium"
        type="number"
        fullWidth
      />
    </GridLayout>
  </Stack>
);

const ComputeConf = () => (
  <Stack>
    <Heading size="sm" title="Compute" mb={2} />
    <GridLayout xs={12} md={6} lg={4} spacing={2} rowSpacing={0.5}>
      <TextInput
        label="Frontal Memory"
        source="conf.compute.frontal_memory"
        variant="outlined"
        size="medium"
        type="number"
        fullWidth
      />
      <TextInput
        label="Worker Memory"
        source="conf.compute.worker_memory"
        variant="outlined"
        size="medium"
        type="number"
        fullWidth
      />
      <TextInput
        label="Worker Batch"
        source="conf.compute.worker_batch"
        variant="outlined"
        size="medium"
        type="number"
        fullWidth
      />
    </GridLayout>
  </Stack>
);

const ConcurrencyConf = () => (
  <Stack>
    <Heading size="sm" title="Concurrency" mb={2} />
    <GridLayout xs={12} md={6} lg={4} spacing={2} rowSpacing={0.5}>
      <TextInput
        label="Frontal Reserved Concurrent Executions NB"
        source="conf.concurrency.frontal_reserved_concurrent_executions_nb"
        variant="outlined"
        size="medium"
        fullWidth
      />
      <TextInput
        label="Worker Reserved Concurrent Executions NB"
        source="conf.concurrency.worker_reserved_concurrent_executions_nb"
        variant="outlined"
        size="medium"
        fullWidth
      />
    </GridLayout>
  </Stack>
);

const DBConf = () => {
  const {watch} = useFormContext();
  const db = watch("conf.with_database");
  return (
    <Stack>
      <Heading size="sm" title="DB" mb={2} />
      <GridLayout xs={12} md={6} lg={4} spacing={2} rowSpacing={0.5}>
        <SelectInput
          label="DB"
          source="conf.with_database"
          choices={makeSelectChoices(["aurora-postgres", "sqlite"])}
          variant="outlined"
          size="medium"
          fullWidth
        />
        <TextInput
          label="Non Root Username"
          source="conf.database.database_non_root_username"
          variant="outlined"
          size="medium"
          fullWidth
        />
        <TextInput
          label="Non Root Password"
          source="conf.database.database_non_root_password"
          variant="outlined"
          size="medium"
          type="password"
          fullWidth
        />
        <TextInput
          label="Prod DB Cluster Timeout"
          source="conf.database.prod_db_cluster_timeout"
          variant="outlined"
          size="medium"
          type="number"
          fullWidth
        />
      </GridLayout>

      {db === "aurora-postgres" && (
        <GridLayout
          xs={12}
          md={6}
          lg={4}
          spacing={2}
          rowSpacing={0.5}
          alignItems="center"
        >
          <TextInput
            label="Aurora Min Capacity"
            source="conf.aurora.aurora_min_capacity"
            variant="outlined"
            size="medium"
            fullWidth
            type="number"
          />
          <TextInput
            label="Aurora Max Capacity"
            source="conf.aurora.aurora_max_capacity"
            variant="outlined"
            size="medium"
            fullWidth
            type="number"
          />
          <TextInput
            label="Aurora Scale Point"
            source="conf.aurora.aurora_scale_point"
            variant="outlined"
            size="medium"
            fullWidth
            type="number"
          />
          <TextInput
            label="Aurora Sleep"
            source="conf.aurora.aurora_sleep"
            variant="outlined"
            size="medium"
            fullWidth
            type="number"
          />
          <BooleanInput
            label="Aurora Auto Pause"
            source="conf.aurora.aurora_auto_pause"
            variant="outlined"
            size="medium"
          />
        </GridLayout>
      )}
    </Stack>
  );
};

const EmailConf = () => (
  <Stack>
    <Heading size="sm" title="Emailing" mb={2} />
    <GridLayout xs={12} md={6} lg={4} spacing={2}>
      <TextInput
        label="SES source (mail)"
        source="conf.ses_source"
        variant="outlined"
        size="medium"
        fullWidth
      />
    </GridLayout>
  </Stack>
);

const GenClientConf = () => {
  const {watch} = useFormContext();
  const withGenClients = watch("conf.with_gen_clients");
  return (
    <Stack>
      <Heading
        size="sm"
        title={
          <TitleWithToggle
            size="sm"
            title="Gen API Client"
            fieldSource="conf.with_gen_clients"
          />
        }
      />
      {withGenClients && (
        <GridLayout
          xs={12}
          md={6}
          lg={4}
          spacing={2}
          rowSpacing={0.5}
          alignItems="center"
        >
          <TextInput
            label="Default OpenAPI Server URL"
            source="conf.client.ts_client_default_openapi_server_url"
            variant="outlined"
            size="medium"
            fullWidth
          />
          <TextInput
            label="API URL Env Var name"
            source="conf.client.ts_client_api_url_env_var_name"
            variant="outlined"
            size="medium"
            fullWidth
          />
          <BooleanInput
            label="Publish to npm registry"
            source="conf.with_publish_to_npm_registry"
            variant="outlined"
            size="medium"
            fullWidth
          />
        </GridLayout>
      )}
    </Stack>
  );
};
