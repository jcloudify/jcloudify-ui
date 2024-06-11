import {
  ShowBase,
  TextField,
  Labeled,
  useShowContext,
  DateField,
  FunctionField,
} from "react-admin";
import {Stack, Typography} from "@mui/material";
import {ShowLayout} from "@/operations/components/show";
import {GridLayout} from "@/components/grid";
import {ContainerWithHeading} from "@/components/container";
import {TerminalLog} from "@/components/terminal";
import {fromToNow} from "@/utils/date";
import {TODO_Deployment} from "@/services/poja-api";
import {DEPLOYMENT_STATE_TEXT} from ".";

const LOG_CONTENT = [
  "2024-06-11 08:00:00 INFO Deployment initiated by user 'devops_01'",
  "2024-06-11 08:01:15 INFO Checking out repository from 'https://github.com/example/app.git'",
  "2024-06-11 08:02:22 INFO Repository checkout completed",
  "2024-06-11 08:03:00 INFO Building application with Maven",
  "2024-06-11 08:04:35 INFO Build completed successfully",
  "2024-06-11 08:05:10 INFO Running unit tests",
  "2024-06-11 08:06:40 WARN Some unit tests are marked as skipped",
  "2024-06-11 08:07:25 INFO Unit tests completed: 120 passed, 3 failed, 5 skipped",
  "2024-06-11 08:08:05 INFO Packaging application",
  "2024-06-11 08:09:50 INFO Application package created at '/builds/app-1.0.0.jar'",
  "2024-06-11 08:10:30 INFO Deploying application to staging environment",
  "2024-06-11 08:11:45 INFO Staging deployment completed",
  "2024-06-11 08:12:10 INFO Running integration tests on staging environment",
  "2024-06-11 08:13:55 INFO Integration tests passed: 50/50",
  "2024-06-11 08:14:30 INFO Promoting application to production environment",
  "2024-06-11 08:15:45 INFO Production deployment started",
  "2024-06-11 08:16:22 ERROR Failed to start application on node 'prod-01': Port 8080 already in use",
  "2024-06-11 08:17:10 WARN Retrying deployment on node 'prod-01'",
  "2024-06-11 08:18:40 INFO Deployment on node 'prod-01' successful on port 9090",
  "2024-06-11 08:19:10 INFO Deploying application on node 'prod-02'",
  "2024-06-11 08:20:25 INFO Deployment on node 'prod-02' successful",
  "2024-06-11 08:21:00 INFO Application version '1.0.0' successfully deployed to production",
  "2024-06-11 08:22:15 INFO Post-deployment health checks started",
  "2024-06-11 08:23:30 INFO Health checks passed on all nodes",
  "2024-06-11 08:24:00 INFO Deployment completed by user 'devops_01'",
];

const DeploymentShowView: React.FC = () => {
  const {record: depl} = useShowContext();
  return (
    <Stack mt={4} mb={3} spacing={3} width={{lg: "50%", md: "70%"}}>
      <ContainerWithHeading title={`Deployment: ${depl?.id}`}>
        <GridLayout xs={12} sm={6} sx={{fontSize: "1.2rem"}}>
          <Labeled>
            <TextField label="Environment" source="target_env_type" />
          </Labeled>

          <Labeled>
            <FunctionField<TODO_Deployment>
              label="state"
              render={(depl) => (
                <Typography>{DEPLOYMENT_STATE_TEXT[depl.state]}</Typography>
              )}
            />
          </Labeled>

          <Labeled>
            <FunctionField<TODO_Deployment>
              label="Created"
              render={(depl) => (
                <Typography>{fromToNow(depl.createdAt)}</Typography>
              )}
            />
          </Labeled>
        </GridLayout>
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
