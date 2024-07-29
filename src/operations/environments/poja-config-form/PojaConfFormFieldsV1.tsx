import {DatabaseConf1WithDatabaseEnum} from "@jcloudify-api/typescript-client";
import {memo} from "react";
import {
  TextInput,
  BooleanInput,
  SelectInput,
  EditBase,
  Form,
  SimpleForm,
} from "react-admin";
import {useWatch} from "react-hook-form";
import {
  Stack,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import {ExpandMore} from "@mui/icons-material";
import {GridLayout} from "@/components/grid";
import {Heading} from "@/components/head";
import {Divider} from "@/components/divider";

import {makeSelectChoices} from "@/operations/utils/ra-props";
import {TitleWithToggle} from "@/operations/components/head";
import {
  BatchArrayEditorField,
  BatchRecordEditorField,
} from "@/operations/components/field";

export interface PojaConfEditV1Props {
  appId: string;
  envId: string;
  onSettled: () => void;
}

export const PojaConfEditV1: React.FC<PojaConfEditV1Props> = ({
  appId,
  envId,
  onSettled,
}) => {
  return (
    <EditBase
      resource="pojaConf"
      id={envId}
      queryOptions={{
        meta: {
          appId,
        },
      }}
      mutationOptions={{
        meta: {
          appId,
          envId,
        },
        onSettled,
      }}
    >
      <SimpleForm>
        <PojaConfFormFieldsV1 />
      </SimpleForm>
    </EditBase>
  );
};

export const PojaConfFormFieldsV1: React.FC = memo(() => (
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

    <GenAPIClientConf />
    <Divider />

    <IntegrationConf />
    <Divider />
  </Stack>
));

const GeneralConf = () => (
  <Stack>
    <Heading size="sm" title="General" mb={2} />
    <GridLayout xs={12} md={6} lg={4} spacing={2} alignItems="center">
      <TextInput
        label="Package name"
        source="general.package_full_name"
        variant="outlined"
        size="medium"
        fullWidth
      />
      <SelectInput
        label="Queues NB"
        source="general.with_queues_nb"
        choices={makeSelectChoices([0, 1, 2])}
        variant="outlined"
        size="medium"
        fullWidth
      />
      <BooleanInput
        label="Snapstart"
        source="general.with_snapstart"
        variant="outlined"
        size="medium"
        fullWidth
      />
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
        <BatchRecordEditorField
          source="general.custom_java_env_vars"
          placeholders={["e.g: CLIENT_KEY", "XXX"]}
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
        <BatchArrayEditorField source="general.custom_java_repositories" />
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
        <BatchArrayEditorField source="general.custom_java_deps" />
      </AccordionDetails>
    </Accordion>
  </Stack>
);

const IntegrationConf = () => (
  <Stack>
    <Heading size="sm" title="Integration" mb={2} />
    <GridLayout xs={12} md={6} lg={4} spacing={2} alignItems="center">
      <BooleanInput
        label="CodeQL"
        source="integration.with_codeql"
        variant="outlined"
        size="medium"
        fullWidth
      />
      <BooleanInput
        label="Sonar"
        source="integration.with_sonar"
        variant="outlined"
        size="medium"
        fullWidth
      />
      <BooleanInput
        label="Sentry"
        source="integration.with_sentry"
        variant="outlined"
        size="medium"
        fullWidth
      />
      <BooleanInput
        label="Swagger UI"
        source="integration.with_swagger_ui"
        variant="outlined"
        size="medium"
        fullWidth
      />
      <BooleanInput
        label="File Storage"
        source="integration.with_file_storage"
        variant="outlined"
        size="medium"
        fullWidth
      />
    </GridLayout>
  </Stack>
);

const GenAPIClientConf = () => {
  const withGenClients = useWatch({name: "__conf.with_gen_clients"});
  const withPublishToNpmRegistry = useWatch({
    name: "gen_api_client.with_publish_to_npm_registry",
  });
  return (
    <Stack>
      <Heading
        size="sm"
        title={
          <TitleWithToggle
            size="sm"
            title="Gen API Client"
            fieldSource="__conf.with_gen_clients"
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
            source="gen_api_client.ts_client_default_openapi_server_url"
            variant="outlined"
            size="medium"
            fullWidth
          />
          <TextInput
            label="API URL Env Var Name"
            source="gen_api_client.ts_client_api_url_env_var_name"
            variant="outlined"
            size="medium"
            fullWidth
          />
          <BooleanInput
            label="Publish to npm registry"
            source="gen_api_client.with_publish_to_npm_registry"
            variant="outlined"
            size="medium"
            fullWidth
          />
        </GridLayout>
      )}

      {withPublishToNpmRegistry && (
        <GridLayout
          xs={12}
          md={6}
          lg={4}
          spacing={2}
          rowSpacing={0.5}
          alignItems="center"
        >
          <TextInput
            label="AWS Account ID"
            source="gen_api_client.aws_account_id"
            variant="outlined"
            size="medium"
            fullWidth
          />
          <TextInput
            label="CodeArtifact Repository Name"
            source="gen_api_client.codeartifact_repository_name"
            variant="outlined"
            size="medium"
            fullWidth
          />
          <TextInput
            label="CodeArtifact domain name"
            source="gen_api_client.codeartifact_domain_name"
            variant="outlined"
            size="medium"
            fullWidth
          />
        </GridLayout>
      )}
    </Stack>
  );
};

const ConcurrencyConf = () => (
  <Stack>
    <Heading size="sm" title="Concurrency" mb={2} />
    <GridLayout xs={12} md={6} lg={4} spacing={2} rowSpacing={0.5}>
      <TextInput
        label="Frontal Reserved Concurrent Executions NB"
        source="concurrency.frontal_reserved_concurrent_executions_nb"
        variant="outlined"
        size="medium"
        type="number"
        fullWidth
      />
      <TextInput
        label="Worker Reserved Concurrent Executions NB"
        source="concurrency.worker_reserved_concurrent_executions_nb"
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
        source="compute.frontal_memory"
        variant="outlined"
        size="medium"
        type="number"
        fullWidth
      />
      <TextInput
        label="Frontal Function Timeout"
        source="compute.frontal_function_timeout"
        variant="outlined"
        size="medium"
        type="number"
        fullWidth
      />
      <TextInput
        label="Worker Memory"
        source="compute.worker_memory"
        variant="outlined"
        size="medium"
        type="number"
        fullWidth
      />
      <TextInput
        label="Worker Batch"
        source="compute.worker_batch"
        variant="outlined"
        size="medium"
        type="number"
        fullWidth
      />
      <TextInput
        label="Worker Function 1 Timeout"
        source="compute.worker_function_1_timeout"
        variant="outlined"
        size="medium"
        type="number"
        fullWidth
      />
      <TextInput
        label="Worker Function 2 Timeout"
        source="compute.worker_function_2_timeout"
        variant="outlined"
        size="medium"
        type="number"
        fullWidth
      />
    </GridLayout>
  </Stack>
);

const MailingConf = () => (
  <Stack>
    <Heading size="sm" title="Mailing" mb={2} />
    <GridLayout xs={12} md={6} lg={4} spacing={2}>
      <TextInput
        label="SES source (mail)"
        source="emailing.ses_source"
        variant="outlined"
        size="medium"
        fullWidth
      />
    </GridLayout>
  </Stack>
);

const TestingConf = () => (
  <Stack>
    <Heading size="sm" title="Testing" mb={2} />
    <GridLayout xs={12} md={6} lg={4} spacing={2} alignItems="center">
      <TextInput
        label="Java Facade IT"
        source="testing.java_facade_it"
        variant="outlined"
        size="medium"
        fullWidth
      />
      <TextInput
        label="Jacoco Min Coverage"
        source="testing.jacoco_min_coverage"
        variant="outlined"
        size="medium"
        type="number"
        fullWidth
      />
    </GridLayout>
  </Stack>
);

const DBConf = () => {
  const withDatabase = useWatch({name: "database.with_database"});
  const noneOrNonManaged =
    withDatabase === DatabaseConf1WithDatabaseEnum.NONE ||
    withDatabase === DatabaseConf1WithDatabaseEnum.NON_MANAGED_POSTGRES;

  return (
    <Stack>
      <Heading size="sm" title="DB" mb={2} />
      <GridLayout xs={12} md={6} lg={4} spacing={2} rowSpacing={0.5}>
        <SelectInput
          label="Variant"
          source="database.with_database"
          choices={makeSelectChoices(
            Object.keys(DatabaseConf1WithDatabaseEnum)
          )}
          variant="outlined"
          size="medium"
          fullWidth
        />
      </GridLayout>

      {!noneOrNonManaged && (
        <GridLayout xs={12} md={6} lg={4} spacing={2} rowSpacing={0.5}>
          <TextInput
            label="Non Root Username"
            source="database.database_non_root_username"
            variant="outlined"
            size="medium"
            fullWidth
          />
          <TextInput
            label="Non Root Password"
            source="database.database_non_root_password"
            variant="outlined"
            size="medium"
            type="password"
            fullWidth
          />
          <TextInput
            label="Prod DB Cluster Timeout"
            source="database.prod_db_cluster_timeout"
            variant="outlined"
            size="medium"
            type="number"
            fullWidth
          />
        </GridLayout>
      )}

      {withDatabase === DatabaseConf1WithDatabaseEnum.AURORA_POSTGRES && (
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
            source="database.aurora_min_capacity"
            variant="outlined"
            size="medium"
            fullWidth
            type="number"
          />
          <TextInput
            label="Aurora Max Capacity"
            source="database.aurora_max_capacity"
            variant="outlined"
            size="medium"
            fullWidth
            type="number"
          />
          <TextInput
            label="Aurora Scale Point"
            source="database.aurora_scale_point"
            variant="outlined"
            size="medium"
            fullWidth
            type="number"
          />
          <TextInput
            label="Aurora Sleep"
            source="database.aurora_sleep"
            variant="outlined"
            size="medium"
            fullWidth
            type="number"
          />
          <BooleanInput
            label="Aurora Auto Pause"
            source="database.aurora_auto_pause"
            variant="outlined"
            size="medium"
          />
        </GridLayout>
      )}
    </Stack>
  );
};
