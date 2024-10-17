import {IconButtonWithTooltip} from "react-admin";
import {MdHome} from "react-icons/md";
import {Box, Stack, Typography, useMediaQuery} from "@mui/material";
import {colors} from "@/themes";
import {Octagon} from "@/components/shape";
import {redirect} from "@/utils/redirect";
import {jcloudifyWebsiteUrl} from "@/config/env";

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
          sx={{backgroundColor: colors("dark-1")}}
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
        <Stack width="100%" direction="row" alignItems="center" p={3}>
          <Typography variant="h3" fontWeight="600" flex={1}>
            JCloudify
          </Typography>

          <Box>
            <IconButtonWithTooltip
              label="Home"
              onClick={() => redirect(jcloudifyWebsiteUrl)}
            >
              <MdHome size={20} />
            </IconButtonWithTooltip>
          </Box>
        </Stack>
        {children}
        <Octagon top={100} left={-150} color={colors("gray-1")} />
        <Octagon bottom={-30} right={-30} />
      </Stack>
    </Stack>
  );
};
