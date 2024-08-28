import {Button} from "react-admin";
import {RouteMap} from "@/components/router";
import {Heading} from "@/components/head";
import {Box, Stack} from "@mui/material";
import {
  StackEventList,
  StackId,
  StackOutputList,
  StackShowLayout,
} from "@/operations/stacks";
import {useNavigate, useParams} from "react-router-dom";
import {WithTab} from "@/components/tab";
import {Pagination} from "@/operations/components/list";
import {FaCubesStacked as StackIcon} from "react-icons/fa6";

const StackEventListViews: React.FC = () => {
  const {appId, stackId, envId} = useParams();
  const to = useNavigate();
  if (!appId || !stackId || !envId) return;
  return (
    <WithTab tab="Events">
      <Box mt={3}>
        <Heading
          title={
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              spacing={2}
            >
              <StackId appId={appId} stackId={stackId} envId={envId} />
              <Box>
                <Button
                  variant="outlined"
                  startIcon={<StackIcon />}
                  label="Stacks"
                  onClick={() =>
                    to(`/applications/${appId}/show/environments/stacks`)
                  }
                />
              </Box>
            </Stack>
          }
          subtitle="List of events"
          size="sm"
          p={1}
        />

        <StackEventList
          appId={appId}
          stackId={stackId}
          envId={envId}
          actions={false}
          exporter={false}
          title=" "
          pagination={<Pagination />}
        />
      </Box>
    </WithTab>
  );
};

export const StackOutputListViews: React.FC = () => {
  const {appId, stackId, envId} = useParams();
  const to = useNavigate();
  if (!appId || !stackId || !envId) return;
  return (
    <WithTab tab="Outputs">
      <Box mt={3}>
        <Heading
          title={
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              spacing={2}
            >
              <StackId appId={appId} stackId={stackId} envId={envId} />
              <Box>
                <Button
                  variant="outlined"
                  startIcon={<StackIcon />}
                  label="Stacks"
                  onClick={() =>
                    to(`/applications/${appId}/show/environments/stacks`)
                  }
                />
              </Box>
            </Stack>
          }
          subtitle="List of outputs"
          size="sm"
          p={1}
        />

        <StackOutputList
          appId={appId}
          stackId={stackId}
          envId={envId}
          actions={false}
          exporter={false}
          title=" "
          pagination={<Pagination />}
        />
      </Box>
    </WithTab>
  );
};

export const stackShowViews: RouteMap = {
  $$layout: <StackShowLayout />,
  events: <StackEventListViews />,
  outputs: <StackOutputListViews />,
};
