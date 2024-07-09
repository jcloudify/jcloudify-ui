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
  title: React.ReactNode;
  subheader?: React.ReactNode;
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
          typeof title === "string" ? (
            <Typography variant="h6" fontWeight="575">
              {title}
            </Typography>
          ) : (
            title
          )
        }
      />

      <Divider sx={{borderColor: colors("gray-0")}} />

      <CardContent>
        {subheader != null &&
          (typeof subheader === "string" ? (
            <Typography variant="body2" px={2} mt={2} color="text.secondary">
              {subheader}
            </Typography>
          ) : (
            subheader
          ))}

        <Stack py={3} px={2} width="100%" height="100%" direction="column">
          {children}
        </Stack>
      </CardContent>
    </Card>
  );
};
