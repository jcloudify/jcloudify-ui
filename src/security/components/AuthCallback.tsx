import {useEffect, useRef} from "react";
import {useSearchParams} from "react-router-dom";
import {Box} from "@mui/material";
import {Loading} from "@/components/loading";
import {authProvider} from "@/providers";
import {redirect} from "@/utils/redirect";

export const AuthCallback: React.FC = () => {
  const [p] = useSearchParams();

  const exchanged = useRef(false);

  const code = p.get("code");

  useEffect(() => {
    const doLogin = async () => {
      if (code && !exchanged.current) {
        exchanged.current = true;
        const redirectionUrl = await authProvider.login({
          code,
        });
        if (redirectionUrl) {
          redirect(redirectionUrl);
        }
      }
    };
    void doLogin();
  }, [code]);

  return (
    <Box height="100vh">
      <Loading
        size="lg"
        primaryText="Authenticating..."
        secondaryText="We're verifying your identity. This should only take a few seconds."
      />
    </Box>
  );
};
