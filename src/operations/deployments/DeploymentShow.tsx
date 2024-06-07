import {ShowBase, useShowContext, TextField, Labeled} from "react-admin";
import {
  Box,
  Divider,
  Stack,
  Card,
  CardHeader,
  CardContent,
} from "@mui/material";
import {ShowLayout} from "@/operations/components/show";
import {ContainerWithHeading} from "@/components/container";
import {colors} from "@/themes";

const DeploymentShowView: React.FC = () => {
  const {record: depl} = useShowContext();

  return (
    <Stack mt={4}>
      <Card
        component={Box}
        flex={1}
        height="100%"
        width={{lg: "50%", md: "70%"}}
      >
        <CardHeader title="Overview" />
        <Divider sx={{borderColor: colors("gray-0")}} />
        <CardContent sx={{fontSize: "1.5rem"}}>
          <Stack spacing={2}>
            <Labeled>
              <TextField source="id" />
            </Labeled>

            <Labeled label="Environment">
              <TextField source="target_env_type" />
            </Labeled>

            <Labeled label="Environment">
              <TextField source="target_env_type" />
            </Labeled>
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
};

export const DeploymentShow: React.FC<{deplId: string}> = ({deplId}) => {
  return (
    <ShowBase title=" " resource="deployments" id={deplId}>
      <ShowLayout>
        <DeploymentShowView />
      </ShowLayout>
    </ShowBase>
  );
};
