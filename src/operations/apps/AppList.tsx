import {Title, ListBase, useListContext, Link} from "react-admin";
import {
  Box,
  Stack,
  Paper,
  Grid,
  Avatar,
  Typography,
  IconButton,
  Chip,
} from "@mui/material";
import {Apps, Settings, GitHub, Brightness1} from "@mui/icons-material";
import {colors} from "@/themes";
import {AppProps} from "./types";

const AppFlag: React.FC<AppProps> = ({app}) => {
  const isHealthy = app.state === "HEALTHY";
  return (
    <Chip
      icon={
        <Brightness1 fontSize="small" color={isHealthy ? "success" : "error"} />
      }
      label={<Typography variant="body2">{app.state.toLowerCase()}</Typography>}
      sx={{
        width: "fit-content",
        height: "2rem",
        bgcolor: colors("gray-0"),
        border: "1px solid #e0e0e0",
        zIndex: 2,
      }}
    />
  );
};

const AppGridTile: React.FC<AppProps> = ({app}) => {
  const isHealthy = app.state === "HEALTHY";

  return (
    <Grid item xs={12} md={6}>
      <Stack
        data-testid={`applications-${app.id}`}
        role="button"
        component={Paper}
        spacing={2}
        sx={{
          "p": 2,
          "position": "relative",
          "cursor": "pointer",
          ":hover": {
            border: "1px solid #e0e0e0",
          },
        }}
      >
        <Stack direction="row" alignItems="center" spacing={1}>
          <Avatar sx={{bgcolor: "black"}}>
            <Apps />
          </Avatar>
          <Stack flex={1}>
            <Typography fontWeight="semibold">{app.name}</Typography>
            {isHealthy && (
              <Link
                to={app.deployed_url}
                sx={{
                  ":hover": {
                    textDecoration: "underline",
                  },
                  "zIndex": 2,
                  "width": "fit-content",
                }}
              >
                <Typography fontWeight="light" color="gray">
                  {app.deployed_url}
                </Typography>
              </Link>
            )}
          </Stack>
          <Box>
            <IconButton sx={{zIndex: 2}}>
              <Settings />
            </IconButton>
          </Box>
        </Stack>

        <Stack>
          <Link
            to={app.github_repository}
            target="_blank"
            sx={{width: "fit-content", zIndex: 2}}
          >
            <Chip
              icon={<GitHub />}
              label={
                <Typography variant="body2">{app.github_repository}</Typography>
              }
              sx={{
                "width": "fit-content",
                "bgcolor": colors("gray"),
                ":hover": {
                  bgcolor: colors("gray-0"),
                },
              }}
            />
          </Link>
        </Stack>

        <Stack direction="row" justifyContent="flex-end" height="2rem">
          <AppFlag app={app} />
        </Stack>

        <Link
          data-testid={`show-${app.id}-app`}
          to={`${app.id}/show`}
          sx={{
            top: 0,
            left: 0,
            height: "100%",
            width: "100%",
            position: "absolute",
            zIndex: 1,
          }}
        />
      </Stack>
    </Grid>
  );
};

const AppGridView: React.FC = () => {
  const {data = []} = useListContext();
  return (
    <Box>
      <Grid container spacing={1}>
        {data.map((app) => (
          <AppGridTile app={app} key={app.id} />
        ))}
      </Grid>
    </Box>
  );
};

export const AppList: React.FC = () => (
  <ListBase resource="applications">
    <Title title="Applications" />
    <AppGridView />
  </ListBase>
);
