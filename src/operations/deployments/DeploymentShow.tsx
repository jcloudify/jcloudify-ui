import {
  ShowBase,
  TextField,
  Labeled,
  FunctionField,
  Link,
  useRecordContext,
} from "react-admin";
import {Avatar, Stack, Box, Typography} from "@mui/material";
import {GridLayout} from "@/components/grid";
import {ContainerWithHeading} from "@/components/container";
import {TerminalLog} from "@/components/terminal";
import {TypographyLink} from "@/components/link";
import {VCS} from "@/components/source_control";
import {ShowLayout} from "@/operations/components/show";
import {EnvironmentType} from "@/operations/environments";
import {DeploymentState} from "@/operations/deployments";
import {TODO_Deployment} from "@/services/poja-api";
import {colors} from "@/themes";
import {fromToNow} from "@/utils/date";
import {GITHUB_URL_PREFIX} from "@/utils/constant";
import {LOG_CONTENT} from "#/logs.mock";

const DeploymentShowView: React.FC = () => {
  const deployment = useRecordContext<TODO_Deployment>();
  return (
    <Stack mt={4} mb={3} spacing={3} width={{lg: "60%"}}>
      <ContainerWithHeading title="Deployment" sx={{fontSize: "1.2rem"}}>
        <Stack gap={1.5}>
          <GridLayout xs={12} sm={4}>
            <Labeled>
              <TextField label="Deployment ID" source="id" />
            </Labeled>

            <Labeled label="Type">
              <EnvironmentType value={deployment.target_env_type!} />
            </Labeled>
          </GridLayout>

          <GridLayout xs={12} md={4}>
            <Labeled>
              <FunctionField<TODO_Deployment>
                label="Created"
                render={(depl) => (
                  <Stack direction="row" alignItems="center">
                    <Typography>{fromToNow(depl.createdAt)}</Typography>
                    &nbsp;
                    <Link
                      to={GITHUB_URL_PREFIX + depl.creator.username}
                      target="_blank"
                      sx={{zIndex: 3, position: "relative"}}
                    >
                      <Stack
                        direction="row"
                        alignItems="flex-start"
                        spacing={1}
                      >
                        <Box>
                          by{" "}
                          <Typography fontWeight="510" component="b">
                            {depl.creator.username}
                          </Typography>
                        </Box>
                        <Avatar
                          src={depl.creator.avatar}
                          sx={{
                            height: 20,
                            width: 20,
                            border: `1px solid ${colors("gray-1")}`,
                          }}
                        />
                      </Stack>
                    </Link>
                  </Stack>
                )}
              />
            </Labeled>

            <Labeled>
              <FunctionField<TODO_Deployment>
                label="State"
                render={(depl) => <DeploymentState value={depl.state} />}
              />
            </Labeled>

            <Labeled>
              <FunctionField<TODO_Deployment>
                label="Source"
                render={(depl) => (
                  <Box mt={0.5}>
                    <VCS {...depl.github_meta} />
                  </Box>
                )}
              />
            </Labeled>
          </GridLayout>

          <Labeled>
            <FunctionField<TODO_Deployment>
              label="URL"
              render={(depl) =>
                depl.url ? (
                  <TypographyLink target="_blank" to={depl.url!} />
                ) : (
                  "not available"
                )
              }
            />
          </Labeled>
        </Stack>
      </ContainerWithHeading>

      <ContainerWithHeading title="Logs">
        <TerminalLog text={LOG_CONTENT.join("\n")} height="300px" />
      </ContainerWithHeading>
    </Stack>
  );
};

export const DeploymentShow: React.FC<{deplId: string}> = ({deplId}) => {
  return (
    <ShowBase resource="deployments" id={deplId}>
      <ShowLayout>
        <DeploymentShowView />
      </ShowLayout>
    </ShowBase>
  );
};
