import {
  DateField,
  Labeled,
  TextField,
  UrlField,
  useShowContext,
} from "react-admin";
import {Stack} from "@mui/material";
import {ContainerWithHeading} from "@/components/container";
import {TerminalLog} from "@/components/terminal";
import {LOG_CONTENT} from "#/logs.mock";

export const LogShow: React.FC = () => {
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
            <UrlField label="File URI" source="log_file_uri" />
          </Labeled>
          <TerminalLog text={LOG_CONTENT.join("\n")} height="500px" />
        </Stack>
      </ContainerWithHeading>
    </Stack>
  );
};
