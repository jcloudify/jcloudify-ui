import {useMemo, useEffect} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import {Box} from "@mui/material";
import {Loading} from "@/components/loading";
import {appCreateCache, githubAppInstallationProvider} from "@/providers";
import {nanoid} from "nanoid";

export const AppInstallationCallback = () => {
  const [p] = useSearchParams();
  const navigate = useNavigate();

  const installation_id = p.get("installation_id");

  const newId = useMemo(() => nanoid(), []);

  useEffect(() => {
    const doUpdateInstallation = async () => {
      if (installation_id) {
        try {
          await githubAppInstallationProvider.save({
            id: newId,
            gh_installation_id: Number(installation_id),
          });

          navigate(`/applications/create/new`, {
            state: appCreateCache.get(),
          });
        } catch {
          console.error("app installation id");
        }
      }
    };
    void doUpdateInstallation();
  }, [installation_id]);

  return (
    <Box height="100vh">
      <Loading
        size="lg"
        primaryText="Github App Installation..."
        secondaryText="Finalizing installation..."
      />
    </Box>
  );
};
