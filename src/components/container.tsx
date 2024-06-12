import {
  Box,
  Stack,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Divider,
  SxProps,
} from "@mui/material";
import {colors} from "@/themes";

export interface ContainerProps {
  title: string;
  subheader?: string;
  headerColor?: string;
  sx?: SxProps;
}

export const ContainerWithHeading: React.FC<
  React.PropsWithChildren<ContainerProps>
> = ({title, subheader, headerColor = colors("gray"), children, ...rest}) => {
  return (
    <Card component={Box} width="100%" height="100%" {...rest}>
      <CardHeader
        component={Box}
        sx={{
          bgcolor: headerColor,
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
