import {Button} from "react-admin";
import {Navigate, useNavigate, useParams} from "react-router-dom";
import {SiAwslambda} from "react-icons/si";
import {Box, Stack, Typography} from "@mui/material";
import {RouteMap} from "@/components/router";
import {Heading} from "@/components/head";
import {LogGroupList} from "@/operations/lambda-functions";
import {Pagination} from "@/operations/components/list";
import {parseFunctionNameParams} from "./util";

const LogGroupListPage = () => {
  const {appId, envId, functionName} = useParams();
  const to = useNavigate();

  if (!appId || !envId || !functionName) return null;

  const {label} = parseFunctionNameParams(functionName);

  return (
    <Box mt={3}>
      <Heading
        title={
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            spacing={2}
          >
            <Typography variant="h6">{label}</Typography>
            <Box>
              <Button
                variant="outlined"
                startIcon={<SiAwslambda />}
                label="Functions"
                onClick={() =>
                  to(`/applications/${appId}/show/environments/functions`)
                }
              />
            </Box>
          </Stack>
        }
        subtitle="List of log groups"
        size="sm"
        p={1}
      />

      <LogGroupList
        appId={appId}
        envId={envId}
        functionName={functionName}
        actions={false}
        exporter={false}
        title=" "
        pagination={<Pagination />}
      />
    </Box>
  );
};

export const lambdaFnShowViews: RouteMap = {
  "$$index": <Navigate to="log-groups" />,
  "log-groups": <LogGroupListPage />,
  "log-groups/:logGroupName": <Navigate to="streams" />,
  "log-groups/:logGroupName/streams": <h1>log streams</h1>,
  "log-groups/:logGroupName/streams/:logStreamName": <Navigate to="events" />,
  "log-groups/:logGroupName/streams/:logStreamName/events": <h1>log events</h1>,
};
