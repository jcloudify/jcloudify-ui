import {Environment} from "@jcloudify-api/typescript-client";
import {CreateBase, Form, SaveButton, Toolbar} from "react-admin";
import {Stack} from "@mui/material";
import {nanoid} from "nanoid";
import {ContainerWithHeading} from "@/components/container";
import {Heading} from "@/components/head";
import {
  EnvironmentConfFormFields,
  EnvironmentVariablesEdit,
} from "@/operations/environments";

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
  return (
    <CreateBase resource="environments" transform={transformConf}>
      <Form defaultValues={{...template, id: nanoid()}}>
        <Stack mt={4} mb={3} spacing={3} width={{lg: "60%"}}>
          <Heading
            title="Create New Environment"
            subtitle="JCloudify enables you to effortlessly bootstrap a new application, which will be pushed to a GitHub repository of your choice. You can also directly import an existing Git repository."
            mb={4}
            size="sm"
            p={1}
          />

          <ContainerWithHeading title="Variables" sx={{fontSize: "1.2rem"}}>
            <EnvironmentVariablesEdit
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
