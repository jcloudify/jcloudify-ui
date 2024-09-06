import {Button} from "react-admin";
import {Navigate, Outlet, useNavigate, useParams} from "react-router-dom";
import {SiAwslambda} from "react-icons/si";
import {Box, Stack, Typography} from "@mui/material";
import {ChevronLeft} from "@mui/icons-material";
import {RouteMap} from "@/components/router";
import {Heading} from "@/components/head";
import {
  LogGroupList,
  LogStreamList,
  LogStreamEventList,
} from "@/operations/lambda-functions";
import {parseFunctionNameParams} from "@/operations/lambda-functions/util";
import {Pagination} from "@/operations/components/list";
import {WithTab} from "@/components/tab";

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
                startIcon={<SiAwslambda size={18} />}
                label="Functions"
                onClick={() =>
                  to(`/applications/${appId}/show/logs/functions`)
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

const LogStreamListPage = () => {
  const {appId, envId, functionName, logGroupName} = useParams();
  const to = useNavigate();

  if (!appId || !envId || !functionName || !logGroupName) return null;

  const {label} = parseFunctionNameParams(functionName);

  return (
    <Box mt={3}>
      <Heading
        title={
          <Stack direction="column" spacing={2}>
            <Box>
              <Button
                startIcon={<ChevronLeft />}
                label="Log groups"
                onClick={() =>
                  to(
                    `/applications/${appId}/show/logs/environments/${envId}/functions/${functionName}/log-groups`
                  )
                }
              />
            </Box>
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
                  startIcon={<SiAwslambda size={18} />}
                  label="Functions"
                  onClick={() =>
                    to(`/applications/${appId}/show/logs`)
                  }
                />
              </Box>
            </Stack>
          </Stack>
        }
        subtitle="List of log streams"
        size="sm"
        p={1}
      />

      <LogStreamList
        appId={appId}
        envId={envId}
        functionName={functionName}
        logGroupName={logGroupName}
        actions={false}
        exporter={false}
        title=" "
        pagination={<Pagination />}
      />
    </Box>
  );
};

const LogStreamEventListPage = () => {
  const {appId, envId, functionName, logGroupName, logStreamName} = useParams();
  const to = useNavigate();

  if (!appId || !envId || !functionName || !logGroupName || !logStreamName)
    return null;

  const {label} = parseFunctionNameParams(functionName);

  return (
    <Box mt={3}>
      <Heading
        title={
          <Stack direction="column" spacing={2}>
            <Stack direction="row">
              <Button
                startIcon={<ChevronLeft />}
                label="Log groups"
                onClick={() =>
                  to(
                    `/applications/${appId}/show/logs/environments/${envId}/functions/${functionName}/log-groups`
                  )
                }
              />

              <Button
                startIcon={<ChevronLeft />}
                label="Log streams"
                onClick={() =>
                  to(
                    `/applications/${appId}/show/logs/environments/${envId}/functions/${functionName}/log-groups/${encodeURIComponent(logGroupName)}/streams`
                  )
                }
              />
            </Stack>
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
                  startIcon={<SiAwslambda size={18} />}
                  label="Functions"
                  onClick={() =>
                    to(`/applications/${appId}/show/logs`)
                  }
                />
              </Box>
            </Stack>
          </Stack>
        }
        subtitle="List of log stream events"
        size="sm"
        p={1}
      />

      <LogStreamEventList
        appId={appId}
        envId={envId}
        functionName={functionName}
        logGroupName={logGroupName}
        logStreamName={logStreamName}
        actions={false}
        exporter={false}
        title=" "
        pagination={<Pagination />}
      />
    </Box>
  );
};

export const lambdaFnShowViews: RouteMap = {
  "$$layout": (
    <WithTab tab="Logs">
      <Outlet />
    </WithTab>
  ),
  "$$index": <Navigate to="log-groups" />,
  "log-groups": <LogGroupListPage />,
  "log-groups/:logGroupName": <Navigate to="streams" />,
  "log-groups/:logGroupName/streams": <LogStreamListPage />,
  "log-groups/:logGroupName/streams/:logStreamName": <Navigate to="events" />,
  "log-groups/:logGroupName/streams/:logStreamName/events": (
    <LogStreamEventListPage />
  ),
};
