import {Stack, Typography, useMediaQuery} from "@mui/material";
import {colors} from "@/themes";
import {Octagon} from "@/components/shape";

export const LandContainer: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const mdScreen = useMediaQuery("(min-width:990px)");
  return (
    <Stack height="100vh" width="100%" bgcolor="red" direction="row">
      {mdScreen && (
        <Stack
          height="100%"
          width="100%"
          justifyContent="center"
          alignItems="center"
          sx={{
            background:
              "linear-gradient(110deg, rgba(96,156,59,1) 9%, rgba(187,127,7,1) 48%, rgba(30,42,56,1) 97%)",
          }}
        >
          <Typography variant="h4" fontWeight="600" color="#fff">
            Spring Boot, but cloud-native.
          </Typography>
        </Stack>
      )}

      <Stack
        height="100%"
        width="100%"
        bgcolor="#fff"
        position="relative"
        overflow="hidden"
        direction="column"
      >
        <Typography variant="h3" fontWeight="600" p={3}>
          JCloudify
        </Typography>
        {children}
        <Octagon top={100} left={-150} color={colors("gray-1")} />
        <Octagon bottom={-30} right={-30} />
      </Stack>
    </Stack>
  );
};
