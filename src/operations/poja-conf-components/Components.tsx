import {ComponentProps, ComponentType} from "react";
import {Stack, Typography, Chip} from "@mui/material";
import {Heading} from "@/components/head";
import {Divider} from "@/components/divider";
import {typoSizes} from "@/components/typo";
import {
  PojaConfComponent,
  PojaConfEditComponent,
  PojaConfFFComponent,
  PojaConfViewComponent,
  PojaComponentPackage,
} from "@/operations/poja-conf-components";
import {getPojaComponentPackage} from "@/operations/poja-conf-components/pojaComponentPackageRegistry";
import {
  NoPojaConfVersionSelected,
  PojaConfVersionUnavailable,
} from "@/operations/poja-conf-components/Error";

// Higher-Order Component to handle common logic
const WithPojaConfVersion = <P extends ComponentProps<PojaConfComponent>>(
  Cmp: ComponentType<{
    pojaComponentPackage: PojaComponentPackage;
    version: string;
    props: P;
  }>
) => {
  return (props: P & {version?: string}) => {
    if (!props.version) return <NoPojaConfVersionSelected />;
    const pojaConfComponent = getPojaComponentPackage(props.version);
    if (!pojaConfComponent)
      return <PojaConfVersionUnavailable version={props.version} />;
    return (
      <Cmp
        pojaComponentPackage={pojaConfComponent}
        version={props.version}
        props={props}
      />
    );
  };
};

type PojaComponentRenderer<Component extends PojaConfComponent> =
  React.ComponentType<{
    pojaComponentPackage: PojaComponentPackage;
    version: string;
    props: ComponentProps<Component>;
  }>;

const PojaConfView: PojaComponentRenderer<PojaConfViewComponent> = ({
  pojaComponentPackage,
  props,
}) => <pojaComponentPackage.view {...props} />;

const PojaConfFF: PojaComponentRenderer<PojaConfFFComponent> = ({
  pojaComponentPackage,
  version: _version,
  props,
}) => <pojaComponentPackage.ff {...props} />;

const PojaConfEdit: PojaComponentRenderer<PojaConfEditComponent> = ({
  pojaComponentPackage,
  version,
  props,
}) => (
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
    <pojaComponentPackage.edit {...props} />
  </Stack>
);

/**
 * Main Components that get `PojaComponentPackage` according to the version passed to them
 */
const PojaVersionConfView = WithPojaConfVersion(PojaConfView);
const PojaVersionConfFF = WithPojaConfVersion(PojaConfFF);
const PojaVersionConfEdit = WithPojaConfVersion(PojaConfEdit);

export {
  PojaVersionConfView as PojaConfView,
  PojaVersionConfFF as PojaConfFF,
  PojaVersionConfEdit as PojaConfEdit,
};
