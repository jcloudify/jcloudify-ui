import {FunctionField, Labeled, ShowBase, TextField} from "react-admin";
import {useParams} from "react-router-dom";
import {Stack} from "@mui/material";
import {Heading} from "@/components/head";
import {ContainerWithHeading} from "@/components/container";
import {GridLayout} from "@/components/grid";
import {ShowLayout} from "@/operations/components/show";
import {TODO_Application} from "@/services/poja-api";
import {capitalize, unsnake} from "@/utils/str";

const AppMetadataView: React.FC = () => {
  return (
    <Stack spacing={2} mt={2.5} width={{lg: "60%"}}>
      <Heading
        bgcolor="#fff"
        mb={4}
        title="Metadata"
        withBorder
        subtitle="The metadata will be applied to all environments associated with this app."
      />

      <ContainerWithHeading title=" " sx={{fontSize: "1.2rem"}}>
        <Stack gap={1.5}>
          <FunctionField<TODO_Application>
            label="State"
            render={(env) => {
              return (
                <GridLayout xs={12} sm={6} md={4} spacing={2}>
                  {Object.keys(env.metadata!).map((key) => (
                    <Labeled
                      key={`metadata.${key}`}
                      label={capitalize(unsnake(key))}
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

export const AppMetadata: React.FC = () => {
  const {appId} = useParams();
  return (
    <ShowBase resource="applications" id={appId}>
      <ShowLayout>
        <AppMetadataView />
      </ShowLayout>
    </ShowBase>
  );
};
