import {
  Application,
  Environment,
  OneOfPojaConf,
} from "@jcloudify-api/typescript-client";
import {useMemo, memo} from "react";
import {
  Form,
  SaveButton,
  Toolbar,
  SelectInput,
  required,
  useGetOne,
  CreateBase,
  useRedirect,
} from "react-admin";
import {Stack} from "@mui/material";
import {nanoid} from "nanoid";
import {ContainerWithHeading} from "@/components/container";
import {Heading} from "@/components/head";
import {GridLayout} from "@/components/grid";
import {
  EnvironmentType,
  useEnvironmentCreation,
} from "@/operations/environments";
import {
  POJA_CONF_V1_DEFAULT_VALUES,
  fromPojaConfFormData,
} from "@/operations/environments/poja-config-form";
import {PojaConfFormFieldsV1} from "@/operations/environments/poja-config-form";
import {makeSelectChoices} from "@/operations/utils/ra-props";
import {checkPojaConf} from "@/operations/environments/poja-config-form/util";
import {ToRecord} from "@/providers";

export interface EnvironmentCreateProps {
  appId: string;
  template?: Environment;
}

const _EnvironmentCreate: React.FC<{
  appId: string;
  template: Environment | undefined;
}> = ({template, appId}) => {
  const newEnvironmentId = useMemo(() => nanoid(), []);
  const redirect = useRedirect();

  const {data: app} = useGetOne<ToRecord<Application>>("applications", {
    id: appId!,
  });

  const {data: fromConfig} = useGetOne<ToRecord<OneOfPojaConf>>("pojaConf", {
    id: template?.id?.toString()!,
    meta: {
      appId,
    },
  });

  const {creatable} = useEnvironmentCreation(appId);

  const subtitle = template ? (
    <div>
      From <EnvironmentType value={template.environment_type!} />
    </div>
  ) : (
    "From scratch"
  );

  const defaultValues = useMemo(() => {
    return {
      ...POJA_CONF_V1_DEFAULT_VALUES,
      to_create: {id: newEnvironmentId},
      __flags: {
        with_gen_clients: !fromConfig
          ? false
          : checkPojaConf(fromConfig).is_with_gen_api_client,
      },
      ...(fromConfig || {}),
    };
  }, [newEnvironmentId, fromConfig]);

  return (
    <CreateBase
      resource="environments"
      transform={(data) => fromPojaConfFormData(data, app!)}
      mutationOptions={{
        meta: {
          appId: app?.id,
        },
        onSuccess: (environment) => {
          redirect(
            `/applications/${appId}/show/environments/${environment.id}`
          );
        },
      }}
    >
      <Form values={defaultValues} validate={() => Promise.resolve()}>
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
              <SaveButton label="Create" alwaysEnable />
            </Stack>
          </Toolbar>
        </Stack>
      </Form>
    </CreateBase>
  );
};

export const EnvironmentCreate = memo(_EnvironmentCreate);
