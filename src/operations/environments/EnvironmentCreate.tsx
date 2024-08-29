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
import {Stack, Select, MenuItem, Chip, Typography} from "@mui/material";
import {nanoid} from "nanoid";
import {ContainerWithHeading} from "@/components/container";
import {Heading} from "@/components/head";
import {GridLayout} from "@/components/grid";
import {Divider} from "@/components/divider";
import {
  EnvironmentType,
  useEnvironmentCreation,
} from "@/operations/environments";
import {getPojaConfComponent} from "@/operations/environments/poja-conf-form/poja-conf-record";
import {
  PojaConfFF,
  is_with_gen_api_client,
} from "@/operations/environments/poja-conf-form";
import {makeSelectChoices} from "@/operations/utils/ra-props";
import {ToRecord} from "@/providers";
import {usePojaVersionState} from "@/operations/environments/poja-conf-form/hooks/usePojaVersionState";

export interface EnvironmentCreateProps {
  appId: string;
  template?: Environment;
}

const _EnvironmentCreate: React.FC<EnvironmentCreateProps> = ({
  template,
  appId,
}) => {
  const redirect = useRedirect();
  const newEnvironmentId = useMemo(() => nanoid(), []);

  const {data: app} = useGetOne<ToRecord<Application>>("applications", {
    id: appId!,
  });

  const {data: templateConf} = useGetOne<ToRecord<OneOfPojaConf>>("pojaConf", {
    id: template?.id?.toString()!,
    meta: {
      appId,
    },
  });

  const {pojaVersion, setPojaVersion, pojaVersions} = usePojaVersionState(
    templateConf?.version
  );

  const {creatable} = useEnvironmentCreation(appId);

  const pojaConfComponent = useMemo(
    () => getPojaConfComponent(pojaVersion),
    [pojaVersion]
  );

  const defaultValues = useMemo(() => {
    return {
      ...(pojaConfComponent?.defaultValues || {}),
      to_create: {id: newEnvironmentId},
      __flags: {
        with_gen_clients: !templateConf
          ? false
          : is_with_gen_api_client(templateConf),
      },
      ...(templateConf || {}),
    };
  }, [newEnvironmentId, templateConf, pojaConfComponent]);

  if (!pojaVersion) return null;

  return (
    <CreateBase
      resource="environments"
      transform={(data) => pojaConfComponent?.transformFormValues(data, app!)}
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
            subtitle={
              template ? (
                <div>
                  From <EnvironmentType value={template.environment_type!} />
                </div>
              ) : (
                "From scratch"
              )
            }
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
            <Stack gap={1.5}>
              <Stack mb={1.5}>
                <Heading size="sm" title="Version" mb={2} />
                <GridLayout xs={12} md={6} lg={4} spacing={2}>
                  <Select
                    fullWidth
                    value={pojaVersion}
                    size="medium"
                    onChange={(ev) => setPojaVersion(ev.target.value as string)}
                  >
                    {pojaVersions.map((version) => (
                      <MenuItem value={version} key={`pojaVersion-${version}`}>
                        <Chip
                          size="small"
                          label={
                            <Typography variant="body2">{version}</Typography>
                          }
                          variant="filled"
                          sx={{
                            width: "fit-content",
                            bgcolor: "gray",
                            color: "#fff",
                          }}
                        />
                      </MenuItem>
                    ))}
                  </Select>
                </GridLayout>
              </Stack>

              <Divider />

              <PojaConfFF version={pojaVersion} />
            </Stack>
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
