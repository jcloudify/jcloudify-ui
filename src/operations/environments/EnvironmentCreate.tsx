import {
  Environment,
  EnvironmentType as TEnvironmentType,
  OneOfPojaConf,
} from "@jcloudify-api/typescript-client";
import {useMemo, memo} from "react";
import {
  Form,
  SaveButton,
  Toolbar,
  SelectInput,
  required,
  useCreate,
  useGetOne,
  useNotify,
} from "react-admin";
import {SubmitHandler} from "react-hook-form";
import {Stack} from "@mui/material";
import {nanoid} from "nanoid";
import {isAxiosError} from "axios";
import {ContainerWithHeading} from "@/components/container";
import {Heading} from "@/components/head";
import {GridLayout} from "@/components/grid";
import {
  EnvironmentType,
  useEnvironmentCreation,
} from "@/operations/environments";
import {PojaConfFormFieldsV1} from "@/operations/environments/poja-config-form";
import {makeSelectChoices} from "@/operations/utils/ra-props";
import {ToRecord} from "@/providers";
import {fromStringValue} from "@/components/batch-array-editor";
import {toRecord} from "@/components/batch-record-editor";
import { useNavigate } from "react-router-dom";

export interface EnvironmentCreateProps {
  appId: string;
  template?: Environment;
}

const _EnvironmentCreate: React.FC<{
  appId: string;
  template: Environment | undefined;
}> = ({template, appId}) => {
  const newEnvironmentId = useMemo(() => nanoid(), []);
  const notify = useNotify();
  const navigate = useNavigate();

  const [createEnvironmentWithConfig, {isLoading}] = useCreate<Environment>("environments", {
    meta: {
      appId,
      envId: newEnvironmentId,
    },
  });

  const {data: fromConfig = {}} = useGetOne<ToRecord<OneOfPojaConf>>(
    "pojaConf",
    {
      id: template?.id?.toString()!,
      meta: {
        appId,
      },
    }
  );

  const {creatable} = useEnvironmentCreation(appId);

  const subtitle = template ? (
    <div>
      From <EnvironmentType value={template.environment_type!} />
    </div>
  ) : (
    "From scratch"
  );

  const doCreateEnvironmentWithConfig: SubmitHandler<
    {
      to_create?: {environment_type: TEnvironmentType};
    } & Partial<OneOfPojaConf> & {__conf?: any}
  > = async ({to_create, __conf, ...pojaConf}) => {
    try {
      const {custom_java_deps = [], custom_java_env_vars = [], custom_java_repositories = []} = pojaConf.general!;

      await createEnvironmentWithConfig("environments", {
        data: to_create,
        meta: {
          appId,
          with_config: {
            ...pojaConf,
            general: {
              ...pojaConf.general,
              custom_java_deps: fromStringValue(custom_java_deps as any[]),
              custom_java_repositories: fromStringValue(custom_java_repositories as any[]),
              custom_java_env_vars: Array.isArray(custom_java_env_vars) ? toRecord(custom_java_env_vars as unknown as any) : custom_java_env_vars,
              gen_api_client: __conf.with_gen_clients ? null : pojaConf.gen_api_client,
            },
            version: "3.6.2",
          },
        }
      })
      notify("Environment created successfully.", {type: "success"});
      navigate(`/applications/${appId}/show/environments/${newEnvironmentId}`);
    } catch (err) {
      if (isAxiosError(err)) {
        notify(err.response?.data || "unable to create environment.");
      }
    }
  };

  return (
    <Form
      onSubmit={doCreateEnvironmentWithConfig}
      values={{to_create: {id: newEnvironmentId}, __conf: {}, ...fromConfig}}
      validate={() => ({})}
      disabled={isLoading}
      noValidate
    >
      <Stack mt={4} mb={3} spacing={3} width={{lg: "60%"}}>
        <Heading
          title="Create New Environment"
          subtitle={subtitle}
          mb={4}
          size="sm"
          p={1}
        />

        <ContainerWithHeading title="Environment" sx={{fontSize: "1.2rem"}}>
          <GridLayout xs={12} md={6} lg={4} spacing={2}>
            <SelectInput
              label="Type"
              source="to_create.environment_type"
              choices={makeSelectChoices(creatable)}
              variant="outlined"
              defaultValue={creatable[0]}
              optionText={(env) => <EnvironmentType value={env.name} />}
              validate={required()}
              size="medium"
              fullWidth
            />
          </GridLayout>
        </ContainerWithHeading>

        <ContainerWithHeading
          title="Poja Configuration"
          sx={{fontSize: "1.2rem"}}
        >
          <PojaConfFormFieldsV1 />
        </ContainerWithHeading>

        <Toolbar sx={{mt: 2}}>
          <Stack direction="row" spacing={2}>
            <SaveButton label="Create" />
          </Stack>
        </Toolbar>
      </Stack>
    </Form>
  );
};

export const EnvironmentCreate = memo(_EnvironmentCreate);
