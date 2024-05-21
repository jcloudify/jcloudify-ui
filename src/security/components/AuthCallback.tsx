import {useEffect} from "react";
import {useSearchParams} from "react-router-dom";
import {Box} from "@mui/material";
import {Loading} from "@/components/loading";
import {authProvider} from "@/providers";
import {redirect} from "@/utils/redirect";

export const AuthCallback: React.FC = () => {
  const [p] = useSearchParams();

  const code = p.get("code");

  useEffect(() => {
    const exchangeCode = async () => {
      if (code) {
        await authProvider.login({
          code,
        });
        redirect(window.location.origin);
      }
    };
    void exchangeCode();
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
