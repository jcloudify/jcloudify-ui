import {
  Title,
  ListBase,
  useListContext,
  Link,
  TopToolbar,
  Button,
  WithListContext,
  useDeleteWithConfirmController,
  IconButtonWithTooltip,
  Confirm,
} from "react-admin";
import {Box, Stack, Paper, Grid, Avatar, Typography, Chip} from "@mui/material";
import {Apps, Delete, GitHub, Add} from "@mui/icons-material";
import {Empty, Pagination} from "@/operations/components/list";
import {colors} from "@/themes";
import {AppProps} from "@/operations/apps/types";
import {stripPrefix} from "@/utils/str";
import {GITHUB_URL_PREFIX} from "@/utils/constant";

const AppGridTile: React.FC<AppProps> = ({app}) => {
  const {open, isLoading, handleDialogOpen, handleDialogClose, handleDelete} =
    useDeleteWithConfirmController({
      record: app,
      redirect: false,
      mutationMode: "pessimistic",
    });

  return (
    <Grid item xs={12} md={6}>
      <Stack
        height="100%"
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
          </Stack>
          <Box>
            <IconButtonWithTooltip
              label="delete"
              sx={{zIndex: 2}}
              color="error"
              onClick={handleDialogOpen}
            >
              <Delete />
            </IconButtonWithTooltip>
            <Confirm
              isOpen={open}
              loading={isLoading}
              title={`Delete "${app.name}" app`}
              content="Are you sure you want to delete this app?"
              confirmColor="warning"
              onConfirm={handleDelete}
              onClose={handleDialogClose}
            />
          </Box>
        </Stack>

        <Stack>
          <Link
            to={app.repositoryUrl}
            target="_blank"
            sx={{width: "fit-content", zIndex: 2}}
          >
            <Chip
              icon={<GitHub />}
              label={
                <Typography variant="body2">
                  {stripPrefix(app.repositoryUrl || "", GITHUB_URL_PREFIX)}
                </Typography>
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

    <WithListContext
      render={({data = []}) =>
        !!data.length && (
          <>
            <TopToolbar>
              <Button
                label="Create New"
                startIcon={<Add />}
                variant="contained"
                to="create/new"
                component={Link}
              />
            </TopToolbar>
          </>
        )
      }
    />

    <WithListContext
      render={({data = []}) =>
        !data.length && <Empty createRoute="create/new" />
      }
    />

    <AppGridView />

    <Pagination />
  </ListBase>
);
