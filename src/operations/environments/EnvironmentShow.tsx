import {Application, Environment} from "@jcloudify-api/typescript-client";
import {useState} from "react";
import {
  ShowBase,
  TextField,
  Labeled,
  useRecordContext,
  IconButtonWithTooltip,
  useGetOne,
} from "react-admin";
import {Stack, Typography} from "@mui/material";
import {Cancel, Edit} from "@mui/icons-material";
import {GridLayout} from "@/components/grid";
import {ContainerWithHeading} from "@/components/container";
import {ShowLayout} from "@/operations/components/show";
import {EnvironmentType} from "@/operations/environments";
import {
  PojaConfEditV1,
  PojaConfShowV1,
} from "@/operations/environments/poja-config-form";
import {GitBranch} from "@/components/source_control";
import {ToRecord} from "@/providers";

const EnvironmentShowView: React.FC<{appId: string}> = ({appId}) => {
  const [isEditConf, setIsEditConf] = useState(false);
  const {data: app} = useGetOne<ToRecord<Application>>("applications", {
    id: appId,
  });
  const environment = useRecordContext<Environment>();

  return (
    <Stack mt={4} mb={3} spacing={3} width={{lg: "60%"}}>
      <ContainerWithHeading title="Environment" sx={{fontSize: "1.2rem"}}>
        <Stack gap={1.5}>
          <GridLayout xs={6} sm={4}>
            <Labeled label="Type">
              <EnvironmentType value={environment.environment_type!} />
            </Labeled>

            <Labeled label="Source control">
              <GitBranch
                githubRepoURL={app?.repositoryUrl!}
                branchName={
                  environment.environment_type?.toLowerCase() ?? "preprod"
                }
              />
            </Labeled>
          </GridLayout>
        </Stack>
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
          <PojaConfEditV1
            appId={appId}
            envId={environment.id!}
            onSettled={() => setIsEditConf(false)}
          />
        ) : (
          <PojaConfShowV1 appId={appId} envId={environment.id!} />
        )}
      </ContainerWithHeading>
    </Stack>
  );
};

export const EnvironmentShow: React.FC<{envId: string; appId: string}> = ({
  envId,
  appId,
}) => {
  return (
    <ShowBase
      resource="environments"
      id={envId}
      queryOptions={{
        meta: {
          appId,
        },
      }}
    >
      <ShowLayout>
        <EnvironmentShowView appId={appId} />
      </ShowLayout>
    </ShowBase>
  );
};
