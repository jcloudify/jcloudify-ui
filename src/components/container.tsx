import {
  Box,
  Stack,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Divider,
} from "@mui/material";
import {colors} from "@/themes";

export const ContainerWithHeading: React.FC<
  React.PropsWithChildren<{title: string; subheader?: string}>
> = ({title, subheader, children}) => {
  return (
    <Card component={Box} width="100%" height="100%">
      <CardHeader
        component={Box}
        sx={{
          bgcolor: colors("gray"),
        }}
        title={
          <Typography variant="h6" fontWeight="575">
            {title}
          </Typography>
        }
      />

      <Divider sx={{borderColor: colors("gray-0")}} />

      <CardContent>
        {subheader != null && (
          <Typography variant="body2" px={2} mt={2} color="text.secondary">
            {subheader}
          </Typography>
        )}

        <Stack py={3} px={2} width="100%" height="100%" direction="column">
          {children}
        </Stack>
      </CardContent>
    </Card>
  );
};
