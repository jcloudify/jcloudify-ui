import {ComputeStackResource as TComputeStackResource} from "@jcloudify-api/typescript-client";
import {
  Button,
  DatagridLoading,
  Filter,
  ListBase,
  ListProps,
  ListToolbar,
  RaRecord,
  SelectInput,
  required,
  useGetList,
  useListContext,
} from "react-admin";
import {Link} from "react-router-dom";
import {
  Stack,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import {ExpandMore} from "@mui/icons-material";
import {SiAwslambda} from "react-icons/si";
import {COMMON_RA_SELECT_INPUT_SX_PROPS} from "@/components/constants";
import {EnvironmentType} from "@/operations/environments";
import {ToRecord} from "@/providers";
import {NO_OP} from "@/utils/no-op";
import {fromToNow} from "@/utils/date";

export type FunctionListProps<Record extends RaRecord<string> = any> = Omit<
  ListProps<Record>,
  "resource" | "children"
> & {
  appId: string;
};

const LambdaFunction: React.FC<{
  component: string;
  name: string;
  appId: string;
  envId: string;
}> = ({component, name, appId, envId}) => {
  return (
    <Button
      to={`/applications/${appId}/show/environments/${envId}/functions/${component}:${name}`}
      startIcon={<SiAwslambda color="red" />}
      component={Link}
      variant="outlined"
      label={component}
    />
  );
};

const ComputeStackResource: React.FC<{
  appId: string;
  csr: TComputeStackResource;
}> = ({appId, csr}) => {
  csr.environment_id;
  return (
    <Accordion
      data-testid={`csr-${csr.id}`}
      sx={{
        "&::before": {
          display: "none",
        },
        "mb": 1,
      }}
    >
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography variant="body1" fontSize={12} component="p">
          {new Date(csr.creation_datetime!).toLocaleString()}
          &nbsp;
          <Typography variant="body1" component="span" color="grey">
            ({fromToNow(csr.creation_datetime!)})
          </Typography>
        </Typography>
      </AccordionSummary>

      <AccordionDetails>
        <Stack direction="row" spacing={2} alignItems="center">
          <LambdaFunction
            component="Frontal function"
            name={csr.frontal_function_name!}
            appId={appId}
            envId={csr.environment_id!}
          />
          <LambdaFunction
            component="Worker function 1"
            name={csr.worker_1_function_name!}
            appId={appId}
            envId={csr.environment_id!}
          />
          <LambdaFunction
            component="Worker function 2"
            name={csr.worker_2_function_name!}
            appId={appId}
            envId={csr.environment_id!}
          />
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};

const LambdaFunctionsListView: React.FC<{appId: string}> = ({appId}) => {
  const {data = [], isLoading} =
    useListContext<ToRecord<TComputeStackResource>>();

  if (isLoading) {
    return <DatagridLoading nbChildren={1} />;
  }

  return (
    <Stack spacing={1} direction="column">
      {data.map((csr) => (
        <ComputeStackResource appId={appId} csr={csr} />
      ))}
    </Stack>
  );
};

export const LambdaFunctionsList: React.FC<FunctionListProps> = ({
  appId,
  queryOptions = {},
  ...rest
}) => {
  const {data: environments = []} = useGetList("environments", {
    filter: {appId},
  });

  if (!environments.length) return null;

  return (
    <ListBase
      resource="computeStackResources"
      queryOptions={{
        onError: NO_OP,
      }}
      empty={false}
      filter={{
        appId,
      }}
      filterDefaultValues={{
        envId: environments[0]?.id,
      }}
      {...rest}
    >
      <ListToolbar
        title=" "
        filters={
          <Filter>
            <SelectInput
              alwaysOn
              label="Environment"
              source="envId"
              validate={required()}
              choices={[...environments]}
              optionText={(environment) => (
                <EnvironmentType value={environment.environment_type!} />
              )}
              optionValue="id"
              variant="outlined"
              fullWidth
              sx={COMMON_RA_SELECT_INPUT_SX_PROPS}
            />
          </Filter>
        }
      />
      <LambdaFunctionsListView appId={appId} />
    </ListBase>
  );
};
