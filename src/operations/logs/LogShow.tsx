import {
  DateField,
  FunctionField,
  Labeled,
  ShowBase,
  TextField,
  useShowContext,
} from "react-admin";
import {Stack} from "@mui/material";
import {Log} from "@jcloudify-api/typescript-client";
import {ContainerWithHeading} from "@/components/container";
import {TerminalLog} from "@/components/terminal";
import {TypographyLink} from "@/components/link";
import {ShowLayout} from "@/operations/components/show";
import {LOG_CONTENT} from "#/logs.mock";

const LogShowView: React.FC = () => {
  const {record: log} = useShowContext();

  return (
    <Stack mt={4} mb={3} spacing={3} width={{lg: "70%", md: "90%"}}>
      <ContainerWithHeading title={`Log: ${log?.id}`}>
        <Stack spacing={2} direction="column">
          <Labeled>
            <TextField label="Type" source="log_type" />
          </Labeled>

          <Labeled>
            <DateField label="Date" source="log_datetime" showTime />
          </Labeled>

          <Labeled>
            <FunctionField<Log>
              label="URL"
              render={(log) =>
                log.log_file_uri ? (
                  <TypographyLink target="_blank" to={log.log_file_uri!} />
                ) : (
                  "not available"
                )
              }
            />
          </Labeled>
          <TerminalLog text={LOG_CONTENT.join("\n")} height="500px" />
        </Stack>
      </ContainerWithHeading>
    </Stack>
  );
};

export const LogShow: React.FC<{logId: string; envId: string}> = ({
  logId,
  envId,
}) => {
  return (
    <ShowBase
      resource="logs"
      id={logId}
      queryOptions={{meta: {environment_id: envId}}}
    >
      <ShowLayout>
        <LogShowView />
      </ShowLayout>
    </ShowBase>
  );
};
