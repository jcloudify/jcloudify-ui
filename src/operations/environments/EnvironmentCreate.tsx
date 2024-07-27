import {useMemo, memo} from "react";
import {Environment} from "@jcloudify-api/typescript-client";
import {Form, SaveButton, Toolbar, SelectInput, required} from "react-admin";
import {Stack} from "@mui/material";
import {nanoid} from "nanoid";
import {ContainerWithHeading} from "@/components/container";
import {Heading} from "@/components/head";
import {GridLayout} from "@/components/grid";
import {
  EnvironmentType,
  useEnvironmentCreation,
} from "@/operations/environments";
import {PojaConfFormFieldsV1} from "@/operations/environments/poja-config-form";
import {makeSelectChoices} from "@/operations/utils/ra-props";

const transformConf = (data: any) => {
  console.log("create", data);
};

export interface EnvironmentCreateProps {
  appId: string;
  template?: Environment;
}

const _EnvironmentCreate: React.FC<{
  appId: string;
  template: Environment | undefined;
}> = ({template, appId}) => {
  const {creatable} = useEnvironmentCreation(appId);

  const subtitle = template ? (
    <div>
      From <EnvironmentType value={template.environment_type!} />
    </div>
  ) : (
    "From scratch"
  );

  const newEnvironmentId = useMemo(() => nanoid(), []);

  return (
    <Form
      onSubmit={(data) => {
        console.log("manually submitted", data);
      }}
      defaultValues={{...template, id: newEnvironmentId}}
      reValidateMode="onChange"
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
              source="environment_type"
              validate={required()}
              choices={makeSelectChoices(creatable)}
              variant="outlined"
              defaultValue={creatable[0]}
              optionText={(env) => <EnvironmentType value={env.name} />}
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
  );
};

export const EnvironmentCreate = memo(_EnvironmentCreate);
