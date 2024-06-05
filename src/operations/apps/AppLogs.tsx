import {Box, Card, CardHeader, CardContent, Divider} from "@mui/material";
import {colors} from "@/themes";
import {LogList} from "@/operations/logs";

export const AppLogs: React.FC = () => {
  return (
    <Card component={Box} flex={1} height="100%">
      <CardHeader title="Logs" />
      <Divider sx={{borderColor: colors("gray-0")}} />
      <CardContent>
        <LogList exporter={false} envId="tepr" pagination={false} />
      </CardContent>
    </Card>
  );
};
