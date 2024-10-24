import {
  Application,
  Environment,
  OneOfPojaConf,
} from "@jcloudify-api/typescript-client";
import {
  ShowBase,
  Labeled,
  useRecordContext,
  IconButtonWithTooltip,
  useGetOne,
  Loading,
  DeleteWithConfirmButton,
  useRedirect,
} from "react-admin";
import {Box, Stack, Typography, CircularProgress} from "@mui/material";
import {Cancel, Edit} from "@mui/icons-material";
import {useToggle} from "usehooks-ts";
import {GridLayout} from "@/components/grid";
import {ContainerWithHeading} from "@/components/container";
import {GitBranch} from "@/components/source_control";
import {TypographyLink} from "@/components/link";
import {typoSizes} from "@/components/typo";
import {ShowLayout} from "@/operations/components/show";
import {
  EnvironmentType,
  useGetEnvironmentApiURL,
} from "@/operations/environments";
import {
  PojaConfComponentVersion,
  PojaConfEdit,
  PojaConfView,
} from "@/operations/environments/poja-conf-form";
import {ToRecord} from "@/providers";

const EnvironmentShowView: React.FC<{appId: string}> = ({appId}) => {
  const redirect = useRedirect();

  const environment = useRecordContext<Environment>();

  const {data: app} = useGetOne<ToRecord<Application>>("applications", {
    id: appId,
  });

  const {apiUrl, isUnavailable, isLoadingApiURL} = useGetEnvironmentApiURL({
    appId,
    envId: environment?.id!,
  });

  return (
    <Stack mt={4} mb={3} spacing={3} width={{lg: "60%"}}>
      <ContainerWithHeading
        title={
          <Stack direction="row">
            <Typography variant={typoSizes.sm.primary} flex={1}>
              Environment
            </Typography>
            <Box>
              <DeleteWithConfirmButton
                confirmColor="warning"
                confirmContent="Are you sure you want to delete this environment?"
                confirmTitle={
                  <span>
                    Delete &nbsp;
                    <EnvironmentType value={environment?.environment_type!} />
                    &nbsp; environment
                  </span>
                }
                mutationOptions={{
                  meta: {
                    appId,
                  },
                  onSuccess: () => {
                    redirect(`/applications/${appId}/show/environments`);
                  },
                }}
              />
            </Box>
          </Stack>
        }
        sx={{fontSize: "1.2rem"}}
      >
        <Stack gap={1.5}>
          <GridLayout xs={6} sm={4}>
            <Labeled label="Type">
              <EnvironmentType value={environment?.environment_type!} />
            </Labeled>

            <Labeled label="Source control">
              <GitBranch
                githubRepoURL={app?.repositoryUrl!}
                branchName={
                  environment?.environment_type?.toLowerCase() ?? "preprod"
                }
              />
            </Labeled>

            <Labeled label="Active Deployment URL">
              <>
                {isLoadingApiURL && (
                  <Box display="flex" justifyContent="center" my={1}>
                    <CircularProgress size={10} />
                  </Box>
                )}

                {isUnavailable && <Typography>Not available</Typography>}

                {apiUrl && (
                  <TypographyLink
                    fontSize="small"
                    disableOpenIcon
                    copiable={false}
                    target="_blank"
                    to={apiUrl?.value!}
                    data-testid="api-url"
                  >
                    {apiUrl?.value!}
                  </TypographyLink>
                )}
              </>
            </Labeled>
          </GridLayout>
        </Stack>
      </ContainerWithHeading>

      {environment && <PojaConf envId={environment.id!} appId={appId} />}
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
