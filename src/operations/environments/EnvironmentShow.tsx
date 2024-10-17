import {
  Application,
  Environment,
  OneOfPojaConf,
} from "@jcloudify-api/typescript-client";
import {
  ShowBase,
  useRecordContext,
  IconButtonWithTooltip,
  useGetOne,
  Loading,
} from "react-admin";
import {Stack, Typography} from "@mui/material";
import {Cancel, Edit} from "@mui/icons-material";
import {useToggle} from "usehooks-ts";
import {ContainerWithHeading} from "@/components/container";
import {ShowLayout} from "@/operations/components/show";
import {EnvironmentOverviewUI} from "@/operations/environments";
import {
  PojaConfComponentVersion,
  PojaConfEdit,
  PojaConfView,
} from "@/operations/environments/poja-conf-form";
import {ToRecord} from "@/providers";

const EnvironmentShowUI: React.FC<{app: ToRecord<Application>}> = ({app}) => {
  const environment = useRecordContext<ToRecord<Environment>>();

  return (
    <Stack mt={4} mb={3} spacing={3} width={{lg: "60%"}}>
      <EnvironmentOverviewUI app={app} environment={environment!} />
      <PojaConf envId={environment?.id!} appId={app.id} />
    </Stack>
  );
};

const PojaConf: React.FC<{envId: string; appId: string}> = ({appId, envId}) => {
  const [isEditConf, toggleIsEditConf, setIsEditConf] = useToggle(false);

  const environment = useRecordContext<Environment>();
  const {data: pojaConf, isLoading} = useGetOne<ToRecord<OneOfPojaConf>>(
    "pojaConf",
    {id: envId, meta: {appId, targetResource: "environment"}}
  );

  return (
    <ContainerWithHeading
      title={
        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography variant="h6" fontWeight="450">
            Poja Configuration
          </Typography>
          <IconButtonWithTooltip
            label={isEditConf ? "cancel edit" : "edit"}
            onClick={toggleIsEditConf}
          >
            {isEditConf ? <Cancel /> : <Edit />}
          </IconButtonWithTooltip>
        </Stack>
      }
      sx={{fontSize: "1.2rem"}}
    >
      {isLoading && <Loading loadingPrimary="" loadingSecondary="" />}

      {!!pojaConf &&
        (isEditConf ? (
          <PojaConfEdit
            version={pojaConf.version as PojaConfComponentVersion}
            appId={appId}
            targetId={environment?.id!}
            targetResource="environment"
            onSuccess={() => setIsEditConf(false)}
          />
        ) : (
          <PojaConfView
            version={pojaConf.version as PojaConfComponentVersion}
            appId={appId}
            targetId={environment?.id!}
            targetResource="environment"
          />
        ))}
    </ContainerWithHeading>
  );
};

export const EnvironmentShow: React.FC<{envId: string; appId: string}> = ({
  envId,
  appId,
}) => {
  const {data: app, isLoading: isLoadingApp} = useGetOne<ToRecord<Application>>(
    "applications",
    {
      id: appId,
    }
  );

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
      <ShowLayout loading={isLoadingApp}>
        <EnvironmentShowUI app={app!} />
      </ShowLayout>
    </ShowBase>
  );
};
