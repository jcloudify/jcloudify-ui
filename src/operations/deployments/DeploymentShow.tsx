import {
  AppEnvDeployment,
  EnvironmentType as EnvironmentTypeEnum,
  OneOfPojaConf,
} from "@jcloudify-api/typescript-client";
import {
  ShowBase,
  Labeled,
  Loading,
  Link,
  useRecordContext,
  useGetOne,
} from "react-admin";
import {Avatar, Stack, Box, Typography} from "@mui/material";
import {GridLayout} from "@/components/grid";
import {ContainerWithHeading} from "@/components/container";
import {VCS} from "@/components/source_control";
import {ShowLayout} from "@/operations/components/show";
import {EnvironmentType} from "@/operations/environments";
import {
  PojaConfComponentVersion,
  PojaConfView,
} from "@/operations/environments/poja-conf-form";
import {DeploymentProcess} from "@/operations/deployments";
import {JCBot} from "@/operations/github";
import {colors} from "@/themes";
import {fromToNow} from "@/utils/date";
import {GITHUB_URL_PREFIX} from "@/utils/constant";
import {ToRecord} from "@/providers";

const DeploymentShowView: React.FC = () => {
  const deployment = useRecordContext<ToRecord<AppEnvDeployment>>();
  const committerName =
    deployment?.github_meta?.commit?.committer?.login ||
    deployment?.github_meta?.commit?.committer?.name;
  const is_jc_bot = !!deployment?.github_meta?.commit?.committer?.is_jc_bot;
  return (
    <Stack mt={4} mb={3} spacing={3} width={{lg: "60%"}}>
      <ContainerWithHeading title="Deployment" sx={{fontSize: "1.2rem"}}>
        <Stack gap={1.5}>
          <GridLayout xs={12} sm={6}>
            <Labeled label="Environment">
              <EnvironmentType
                value={
                  deployment?.github_meta?.commit?.branch?.toUpperCase()! as EnvironmentTypeEnum
                }
              />
            </Labeled>
          </GridLayout>

          <GridLayout xs={12} md={6}>
            <Labeled label="Created">
              <Stack direction="row" alignItems="center">
                <Typography>
                  {fromToNow(deployment?.creation_datetime!)}
                </Typography>
                &nbsp;
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Typography>&nbsp;by</Typography>

                  {is_jc_bot ? (
                    <JCBot />
                  ) : (
                    <Link
                      aria-disabled={is_jc_bot}
                      to={GITHUB_URL_PREFIX + committerName}
                      target="_blank"
                      sx={{
                        zIndex: 2,
                        position: "relative",
                        textDecoration: "none",
                      }}
                    >
                      <Stack direction="row" gap={1}>
                        <Typography fontWeight="510">
                          {committerName}
                        </Typography>
                        <Avatar
                          src={
                            deployment?.github_meta?.commit?.committer
                              ?.avatar_url
                          }
                          sx={{
                            height: 20,
                            width: 20,
                            border: `1px solid ${colors("gray-1")}`,
                          }}
                        />
                      </Stack>
                    </Link>
                  )}
                </Stack>
              </Stack>
            </Labeled>

            <Labeled label="Source">
              <Box mt={0.5}>
                <VCS {...deployment?.github_meta} />
              </Box>
            </Labeled>
          </GridLayout>

          <Box mt={3}>
            <DeploymentProcess
              deploymentId={deployment?.id!}
              appId={deployment?.application_id!}
              envId={deployment?.environment_id!}
            />
          </Box>
        </Stack>
      </ContainerWithHeading>

      <PojaConf
        deploymentId={deployment?.id!}
        appId={deployment?.application_id!}
      />
    </Stack>
  );
};

const PojaConf: React.FC<{deploymentId: string; appId: string}> = ({
  appId,
  deploymentId,
}) => {
  const {data: pojaConf, isLoading} = useGetOne<ToRecord<OneOfPojaConf>>(
    "pojaConf",
    {id: deploymentId, meta: {appId, targetResource: "deployment"}}
  );

  return (
    <ContainerWithHeading title="Poja Configuration" sx={{fontSize: "1.2rem"}}>
      {isLoading && <Loading loadingPrimary="" loadingSecondary="" />}

      {!!pojaConf && (
        <PojaConfView
          version={pojaConf.version as PojaConfComponentVersion}
          appId={appId}
          targetId={deploymentId}
          targetResource="deployment"
        />
      )}
    </ContainerWithHeading>
  );
};

export const DeploymentShow: React.FC<{
  deploymentId: string;
  appId: string;
}> = ({deploymentId, appId}) => {
  return (
    <ShowBase
      resource="deployments"
      id={deploymentId}
      queryOptions={{meta: {appId}}}
    >
      <ShowLayout>
        <DeploymentShowView />
      </ShowLayout>
    </ShowBase>
  );
};
