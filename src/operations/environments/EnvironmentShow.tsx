import {Environment} from "@jcloudify-api/typescript-client";
import {ShowBase, TextField, Labeled, FunctionField} from "react-admin";
import {Stack} from "@mui/material";
import {GridLayout} from "@/components/grid";
import {ContainerWithHeading} from "@/components/container";
import {ShowLayout} from "@/operations/components/show";
import {
  EnvironmentState,
  EnvironmentVariablesEdit,
} from "@/operations/environments";
import {capitalize, humanizeSnakeStr} from "@/utils/str";

const EnvironmentShowView: React.FC = () => {
  return (
    <Stack mt={4} mb={3} spacing={3} width={{lg: "60%"}}>
      <ContainerWithHeading title="Environment" sx={{fontSize: "1.2rem"}}>
        <Stack gap={1.5}>
          <GridLayout xs={6} sm={4}>
            <Labeled>
              <TextField label="Environment ID" source="id" />
            </Labeled>

            <Labeled>
              <TextField label="Type" source="environment_type" />
            </Labeled>

            <Labeled label="state">
              <FunctionField<Environment>
                label="State"
                render={(env) => <EnvironmentState value={env.state!} />}
              />
            </Labeled>
          </GridLayout>
        </Stack>
      </ContainerWithHeading>

      <ContainerWithHeading title="Variables" sx={{fontSize: "1.2rem"}}>
        <FunctionField<Environment>
          render={(env) => <EnvironmentVariablesEdit envId={env.id!} />}
        />
      </ContainerWithHeading>

      <ContainerWithHeading title="Metadata" sx={{fontSize: "1.2rem"}}>
        <Stack gap={1.5}>
          <FunctionField<Environment>
            label="State"
            render={(env) => {
              return (
                <GridLayout xs={12} sm={6} md={4} spacing={2}>
                  {Object.keys(env.metadata!).map((key) => (
                    <Labeled
                      key={`metadata.${key}`}
                      label={capitalize(humanizeSnakeStr(key))}
                    >
                      <TextField source={`metadata.${key}`} label={key} />
                    </Labeled>
                  ))}
                </GridLayout>
              );
            }}
          />
        </Stack>
      </ContainerWithHeading>
    </Stack>
  );
};

export const EnvironmentShow: React.FC<{envId: string}> = ({envId}) => {
  return (
    <ShowBase resource="environments" id={envId}>
      <ShowLayout>
        <EnvironmentShowView />
      </ShowLayout>
    </ShowBase>
  );
};
