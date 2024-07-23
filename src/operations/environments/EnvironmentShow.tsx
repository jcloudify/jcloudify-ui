import {
  Environment,
  EnvironmentVariable,
} from "@jcloudify-api/typescript-client";
import {useState} from "react";
import {
  ShowBase,
  TextField,
  Labeled,
  useRecordContext,
  IconButtonWithTooltip,
  useGetList,
} from "react-admin";
import {Stack, Typography} from "@mui/material";
import {Cancel, Edit} from "@mui/icons-material";
import {GridLayout} from "@/components/grid";
import {ContainerWithHeading} from "@/components/container";
import {ShowLayout} from "@/operations/components/show";
import {
  EnvironmentState,
  BatchEnvironmentVariableEdit,
  EnvironmentConfShow,
  EnvironmentConfEdit,
  EnvironmentType,
} from "@/operations/environments";
import {ToRecord} from "@/providers";

const EnvironmentShowView: React.FC = () => {
  const [isEditConf, setIsEditConf] = useState(false);
  const record = useRecordContext<Environment>();

  const {data: vars = []} = useGetList<ToRecord<EnvironmentVariable>>(
    "env_variables",
    {meta: {env_id: record?.id}}
  );

  return (
    <Stack mt={4} mb={3} spacing={3} width={{lg: "60%"}}>
      <ContainerWithHeading title="Environment" sx={{fontSize: "1.2rem"}}>
        <Stack gap={1.5}>
          <GridLayout xs={6} sm={4}>
            <Labeled>
              <TextField label="Environment ID" source="id" />
            </Labeled>

            <Labeled label="Type">
              <EnvironmentType value={record.environment_type!} />
            </Labeled>

            <Labeled label="State">
              <EnvironmentState value={record.state!} />
            </Labeled>
          </GridLayout>
        </Stack>
      </ContainerWithHeading>

      <ContainerWithHeading title="Variables" sx={{fontSize: "1.2rem"}}>
        <BatchEnvironmentVariableEdit
          hasSave
          saveEnvId={record.id!}
          defaultVars={vars}
        />
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
