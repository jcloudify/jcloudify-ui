import {useEffect, useRef, useState} from "react";
import {Link, useSearchParams} from "react-router-dom";
import {Stack, Box, Button} from "@mui/material";
import {Loading} from "@/components/loading";
import {Heading} from "@/components/head";
import {authProcess, authProvider} from "@/providers";
import {getAuthProcessRedirectUri} from "@/utils/constant";
import {redirect} from "@/utils/redirect";

export const AuthCallback: React.FC = () => {
  const [hasError, setHasError] = useState(false);
  const [p] = useSearchParams();

  const code = p.get("code");

  const isExchanged = useRef(false);

  useEffect(() => {
    const authenticate = async () => {
      if (code && !isExchanged.current) {
        isExchanged.current = true;
        try {
          await authProvider.exchangeAuthCode(code);
          if (authProcess.get() === "login") {
            await authProvider.whoami();
          }
          redirect(getAuthProcessRedirectUri());
        } catch {
          setHasError(true);
        }
      }
    };
    void authenticate();
  }, [code]);

  return (
    <Box height="100vh">
      {hasError ? (
        <Stack justifyContent="center" alignItems="center" height="100%" px={3}>
          <AuthenticationError />
        </Stack>
      ) : (
        <Loading
          size="lg"
          primaryText="Authenticating..."
          secondaryText="We're verifying your identity. This should only take a few seconds."
        />
      )}
    </Box>
  );
};

const AuthenticationError: React.FC = () => {
  return (
    <Heading
      isError
      size="lg"
      title="Authentication Failed!"
      width={{xs: "100%", md: "50rem"}}
      subtitle="The authentication process was not successful. The authorization code may have expired."
      textAlign="center"
      gap={2}
      actions={
        <div>
          <Button
            component={Link}
            data-testid="return-to-login-page"
            to="/login"
            size="large"
            variant="text"
            sx={{textTransform: "none", color: "#000", fontWeight: "bold"}}
          >
            Return to login page
          </Button>
        </div>
      }
    />
  );
};
