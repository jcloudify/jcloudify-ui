import {Stack, Button} from "@mui/material";
import {GitHub} from "@mui/icons-material";
import {AuthProcess, authProcess} from "@/providers";
import {LandContainer} from "@/security";
import {gh} from "@/config/env";
import {redirect} from "@/utils/redirect";

const authenticate = (process: AuthProcess) => () => {
  authProcess.replace(process);
  redirect(`https://github.com/login/oauth/authorize?client_id=${gh.clientId}`);
};

export const Authentication = () => {
  return (
    <LandContainer>
      <Stack
        flex={1}
        height="100%"
        width="100%"
        alignItems="center"
        justifyContent="center"
      >
        <Stack direction="column" spacing={2}>
          <Button
            size="large"
            variant="contained"
            startIcon={<GitHub />}
            onClick={authenticate("login")}
          >
            Login
          </Button>

          <Button
            size="large"
            variant="outlined"
            startIcon={<GitHub />}
            onClick={authenticate("signup")}
          >
            Create An Account
          </Button>
        </Stack>
      </Stack>
    </LandContainer>
  );
};
