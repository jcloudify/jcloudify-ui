import {Application, Environment} from "@jcloudify-api/typescript-client";
import {
  ShowBase,
  Labeled,
  DeleteWithConfirmButton,
  useRedirect,
  WithRecord,
  useGetOne,
  Loading,
} from "react-admin";
import {Box, Stack, Typography, CircularProgress} from "@mui/material";
import {GridLayout} from "@/components/grid";
import {GitBranch} from "@/components/source_control";
import {ShowLayout} from "@/operations/components/show";
import {
  EnvironmentType,
  useGetEnvironmentApiURL,
} from "@/operations/environments";
import {ContainerWithHeading} from "@/components/container";
import {TypographyLink} from "@/components/link";
import {typoSizes} from "@/components/typo";
import {ToRecord} from "@/providers";

export const EnvironmentOverviewUI: React.FC<{
  app: ToRecord<Application>;
  environment: ToRecord<Environment>;
  title?: string;
}> = ({app, environment, title = "Environment"}) => {
  const redirect = useRedirect();

  const {apiUrl, isUnavailable, isLoadingApiURL} = useGetEnvironmentApiURL({
    appId: app.id,
    envId: environment.id,
  });

  return (
    <ContainerWithHeading
      title={
        <Stack direction="row">
          <Typography variant={typoSizes.sm.primary} flex={1}>
            {title}
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
                  appId: app.id,
                },
                onSuccess: () => {
                  redirect(`/applications/${app.id}/show/environments`);
                },
              }}
            />
          </Box>
        </Stack>
      }
      sx={{fontSize: "1.2rem"}}
    >
      {environment && app && (
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
      )}
    </ContainerWithHeading>
  );
};

export const EnvironmentOverview: React.FC<{appId: string; envId: string}> = ({
  appId,
  envId,
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
        <WithRecord<ToRecord<Environment>>
          render={(environment) => (
            <EnvironmentOverviewUI environment={environment} app={app!} />
          )}
        />
      </ShowLayout>
    </ShowBase>
  );
};
