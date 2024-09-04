import {Stack as TStack} from "@jcloudify-api/typescript-client";
import {Button, useGetList} from "react-admin";
import {RouteMap} from "@/components/router";
import {Heading} from "@/components/head";
import {Box, Stack, Select, MenuItem} from "@mui/material";
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
import {ToRecord} from "@/providers";
import {optional} from "@/utils/monad";

const SelectStack: React.FC<{
  selectedId: string;
  envId: string;
  appId: string;
  onChange?: (newSelectedId: string) => void;
}> = ({envId, selectedId, appId, onChange}) => {
  const {data: stacks = [], isLoading} = useGetList<ToRecord<TStack>>(
    "stacks",
    {
      filter: {
        appId,
        env_id: envId,
      },
    }
  );

  if (!isLoading && stacks.length) {
    return (
      <Select
        fullWidth
        value={selectedId}
        size="small"
        onChange={(ev) => optional(onChange).call(ev.target.value)}
      >
        {stacks.map((stack) => (
          <MenuItem value={stack.id} key={stack.id}>
            <StackId appId={appId} envId={envId} stackId={stack.id} />
          </MenuItem>
        ))}
      </Select>
    );
  }

  return <StackId appId={appId} stackId={selectedId} envId={envId} />;
};

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
              <Box>
                <SelectStack
                  selectedId={stackId}
                  appId={appId}
                  envId={envId}
                  onChange={(newStackId) => {
                    to(
                      `/applications/${appId}/show/environments/${envId}/stacks/${newStackId}/events`
                    );
                  }}
                />
              </Box>
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
              <Box>
                <SelectStack
                  selectedId={stackId}
                  appId={appId}
                  envId={envId}
                  onChange={(newStackId) => {
                    to(
                      `/applications/${appId}/show/environments/${envId}/stacks/${newStackId}/outputs`
                    );
                  }}
                />
              </Box>
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
