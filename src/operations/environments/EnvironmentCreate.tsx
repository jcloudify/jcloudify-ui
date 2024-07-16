import {
  Environment,
  EnvironmentVariable,
} from "@jcloudify-api/typescript-client";
import {CreateBase, Form, SaveButton, Toolbar, useGetList} from "react-admin";
import {Stack} from "@mui/material";
import {nanoid} from "nanoid";
import {ContainerWithHeading} from "@/components/container";
import {Heading} from "@/components/head";
import {
  EnvironmentConfFormFields,
  EnvironmentVariablesEdit,
} from "@/operations/environments";
import {ToRecord} from "@/providers";

const transformConf = (data: any) => {
  console.log("create", data);
};

export interface EnvironmentCreateProps {
  appId: string;
  template?: Environment;
}

export const EnvironmentCreate: React.FC<{
  appId: string;
  template: Environment | undefined;
}> = ({template}) => {
  const {data: templateVars = []} = useGetList<ToRecord<EnvironmentVariable>>(
    "env_variables",
    {meta: {env_id: template?.id}}
  );

  console.log("template", template);
  const subtitle = template
    ? `From ${template.environment_type} env`
    : "From scratch";

  return (
    <CreateBase resource="environments" transform={transformConf}>
      <Form defaultValues={{...template, id: nanoid()}}>
        <Stack mt={4} mb={3} spacing={3} width={{lg: "60%"}}>
          <Heading
            title="Create New Environment"
            subtitle={subtitle}
            mb={4}
            size="sm"
            p={1}
          />

          <ContainerWithHeading title="Variables" sx={{fontSize: "1.2rem"}}>
            <EnvironmentVariablesEdit
              defaultVars={templateVars}
              onChange={() => {
                /* track values then submit on env created */
              }}
            />
          </ContainerWithHeading>

          <ContainerWithHeading
            title="Poja Configuration"
            sx={{fontSize: "1.2rem"}}
          >
            <EnvironmentConfFormFields />
          </ContainerWithHeading>

          <Toolbar sx={{mt: 2}}>
            <Stack direction="row" spacing={2}>
              <SaveButton alwaysEnable />
            </Stack>
          </Toolbar>
        </Stack>
      </Form>
    </CreateBase>
  );
};
