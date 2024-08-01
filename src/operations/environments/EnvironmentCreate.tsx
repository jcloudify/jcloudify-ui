import {Environment, OneOfPojaConf} from "@jcloudify-api/typescript-client";
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
  PojaConfFormDataV1,
  fromPojaConfFormData,
  useEnvironmentCreation,
} from "@/operations/environments";
import {PojaConfFormFieldsV1} from "@/operations/environments/poja-config-form";
import {makeSelectChoices} from "@/operations/utils/ra-props";
import {ToRecord} from "@/providers";
import {useNavigate} from "react-router-dom";

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

  const [createEnvironmentWithConfig, {isLoading}] = useCreate<Environment>(
    "environments",
    {
      meta: {
        appId,
        envId: newEnvironmentId,
      },
    }
  );

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
      to_create?: Environment;
    } & PojaConfFormDataV1
  > = async ({to_create, ...pojaConf}) => {
    try {
      await createEnvironmentWithConfig("environments", {
        data: to_create,
        meta: {
          appId,
          with_config: fromPojaConfFormData(pojaConf),
        },
      });
      notify("Environment created successfully.", {type: "success"});
      navigate(`/applications/${appId}/show/environments`);
    } catch (err) {
      if (isAxiosError(err)) {
        notify(err.response?.data || "unable to create environment.");
      }
    }
  };

  return (
    <Form
      onSubmit={doCreateEnvironmentWithConfig}
      values={{
        to_create: {id: newEnvironmentId},
        __flags: {with_gen_clients: false},
        version: "3.6.2",
        ...fromConfig,
      }}
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
