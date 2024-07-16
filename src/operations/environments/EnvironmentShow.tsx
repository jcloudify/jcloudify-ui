import {Environment} from "@jcloudify-api/typescript-client";
import {useState} from "react";
import {
  ShowBase,
  TextField,
  Labeled,
  useRecordContext,
  IconButtonWithTooltip,
} from "react-admin";
import {Stack, Typography} from "@mui/material";
import {Cancel, Edit} from "@mui/icons-material";
import {GridLayout} from "@/components/grid";
import {ContainerWithHeading} from "@/components/container";
import {ShowLayout} from "@/operations/components/show";
import {
  EnvironmentState,
  EnvironmentVariablesEdit,
  EnvironmentConfShow,
  EnvironmentConfEdit,
} from "@/operations/environments";

const EnvironmentShowView: React.FC = () => {
  const [isEditConf, setIsEditConf] = useState(false);
  const record = useRecordContext<Environment>();
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
              <EnvironmentState value={record.state!} />
            </Labeled>
          </GridLayout>
        </Stack>
      </ContainerWithHeading>

      <ContainerWithHeading title="Variables" sx={{fontSize: "1.2rem"}}>
        <EnvironmentVariablesEdit envId={record.id!} />
      </ContainerWithHeading>

      <ContainerWithHeading
        title={
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography variant="h6" fontWeight="450">
              Poja Configuration
            </Typography>
            <IconButtonWithTooltip
              label={isEditConf ? "cancel edit" : "edit"}
              onClick={() => setIsEditConf((v) => !v)}
            >
              {isEditConf ? <Cancel /> : <Edit />}
            </IconButtonWithTooltip>
          </Stack>
        }
        sx={{fontSize: "1.2rem"}}
      >
        {isEditConf ? (
          <EnvironmentConfEdit
            envId={record.id!}
            onEdited={() => setIsEditConf(false)}
          />
        ) : (
          <EnvironmentConfShow envId={record.id!} />
        )}
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
