import {Button, Stack, Box, Typography, useMediaQuery} from "@mui/material";
import {GitHub} from "@mui/icons-material";
import {AuthProcess, authProcess} from "@/providers";
import {colors} from "@/themes";
import {gh} from "@/config/env";
import {Octagon} from "@/components/shape";
import {redirect} from "@/utils/redirect";

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
              "linear-gradient(110.6deg, rgb(156, 116, 129) -18.3%, rgb(67, 54, 74) 16.4%, rgb(47, 48, 67) 68.2%, rgb(27, 23, 36) 99.1%)",
          }}
        >
          <Typography variant="h3" fontWeight="600" color="#fff">
            Build for the future
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
