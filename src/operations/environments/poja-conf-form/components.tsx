import {getPojaConfComponent} from "@/operations/environments/poja-conf-form/poja-conf-record";
import {Stack, Typography, Chip} from "@mui/material";
import {Heading} from "@/components/head";
import {Divider} from "@/components/divider";
import {typoSizes} from "@/components/typo";
import {
  PojaConfEditComponent,
  PojaConfFFComponent,
  PojaConfFacadeCmp,
  PojaConfViewComponent,
} from "@/operations/environments/poja-conf-form";

/**
 * Facade
 */
const PojaConfViewFacade: PojaConfFacadeCmp<PojaConfViewComponent> = ({
  version,
  ...props
}) => {
  const Cmp = getPojaConfComponent(version);
  if (!Cmp) return null;
  return <Cmp.view {...props} />;
};

const PojaConfFFFacade: PojaConfFacadeCmp<PojaConfFFComponent> = ({
  version,
  ...props
}) => {
  const Cmp = getPojaConfComponent(version);
  if (!Cmp) return null;
  return <Cmp.ff {...props} />;
};

const PojaConfEditFacade: PojaConfFacadeCmp<PojaConfEditComponent> = ({
  version,
  ...props
}) => {
  const Cmp = getPojaConfComponent(version);
  if (!Cmp) return null;
  return (
    <Stack gap={1.5}>
      <Stack>
        <Heading
          size="sm"
          title={
            <Stack spacing={1}>
              <Typography variant={typoSizes.sm.primary}>Version</Typography>
              <Chip
                size="small"
                label={<Typography variant="body2">{version}</Typography>}
                variant="filled"
                sx={{
                  width: "fit-content",
                  bgcolor: "gray",
                  color: "#fff",
                }}
              />
            </Stack>
          }
          mb={1.5}
        />
        <Divider />
      </Stack>

      <Cmp.edit {...props} />
    </Stack>
  );
};

export {
  PojaConfViewFacade as PojaConfView,
  PojaConfFFFacade as PojaConfFF,
  PojaConfEditFacade as PojaConfEdit,
};
