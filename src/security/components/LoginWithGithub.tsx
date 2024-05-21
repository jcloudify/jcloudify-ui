import {Button} from "react-admin";
import {Stack, Box, Typography, useMediaQuery, Theme} from "@mui/material";
import {GitHub} from "@mui/icons-material";
import {colors} from "@/themes";
import {gh} from "@/config/env";

const Octagon: React.FC<{
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
  color?: string;
}> = ({top, right, bottom, left, color = "primary.main"}) => (
  <Box
    sx={{
      width: 200,
      height: 200,
      backgroundColor: color,
      position: "absolute",
      clipPath:
        "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)",
      top,
      right,
      bottom,
      left,
    }}
  />
);

const getLoginWithGithubUrl = () =>
  `https://github.com/login/oauth/authorize?client_id=${gh.clientId}`;

export const LoginWithGithub: React.FC = () => {
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
        p={4}
        bgcolor="#fff"
        position="relative"
        overflow="hidden"
      >
        <Typography variant="h3" fontWeight="600">
          JCloudify
        </Typography>
        <Stack
          flex={1}
          height="100%"
          width="100%"
          alignItems="center"
          justifyContent="center"
        >
          <Button
            size="large"
            variant="contained"
            startIcon={<GitHub />}
            label="Login with Github"
            href={getLoginWithGithubUrl()}
          />
          <Octagon top={100} left={-150} color={colors("gray-1")} />
          <Octagon bottom={-30} right={-30} />
        </Stack>
      </Stack>
    </Stack>
  );
};
