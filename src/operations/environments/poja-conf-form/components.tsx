import {getPojaVersionedComponent} from "@/operations/environments/poja-conf-form/poja-conf-record";
import {Stack, Typography, Chip} from "@mui/material";
import {Heading} from "@/components/head";
import {Divider} from "@/components/divider";
import {typoSizes} from "@/components/typo";
import {
  PojaConfComponent,
  PojaConfComponentVersion,
  PojaConfEditComponent,
  PojaConfFFComponent,
  PojaConfViewComponent,
  VersionedPojaConfComponents,
} from "@/operations/environments/poja-conf-form";
import {
  NoPojaConfVersionSelected,
  PojaConfVersionUnavailable,
} from "./poja-conf-component-error";
import {ComponentProps, ComponentType} from "react";

// Higher-Order Component to handle common logic
const withPojaConfVersionCheck = <P extends ComponentProps<PojaConfComponent>>(
  Cmp: ComponentType<{
    pojaConfComponent: VersionedPojaConfComponents;
    version: PojaConfComponentVersion;
    props: P;
  }>
) => {
  return (props: P & {version?: PojaConfComponentVersion}) => {
    if (!props.version) return <NoPojaConfVersionSelected />;
    const pojaConfComponent = getPojaVersionedComponent(props.version);
    if (!pojaConfComponent)
      return <PojaConfVersionUnavailable version={props.version} />;
    return (
      <Cmp
        pojaConfComponent={pojaConfComponent}
        version={props.version}
        props={props}
      />
    );
  };
};

type PojaComponentRenderer<Component extends PojaConfComponent> =
  React.ComponentType<{
    pojaConfComponent: VersionedPojaConfComponents;
    version: PojaConfComponentVersion;
    props: ComponentProps<Component>;
  }>;

const PojaConfView: PojaComponentRenderer<PojaConfViewComponent> = ({
  pojaConfComponent,
  props,
}) => <pojaConfComponent.view {...props} />;

const PojaConfFF: PojaComponentRenderer<PojaConfFFComponent> = ({
  pojaConfComponent,
  version: _version,
  props,
}) => <pojaConfComponent.ff {...props} />;

const PojaConfEdit: PojaComponentRenderer<PojaConfEditComponent> = ({
  pojaConfComponent,
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
    <pojaConfComponent.edit {...props} />
  </Stack>
);

/**
 * Facade Components that get `PojaComponent` according to the version passed to them
 */
const PojaConfViewFacade = withPojaConfVersionCheck(PojaConfView);
const PojaConfFFFacade = withPojaConfVersionCheck(PojaConfFF);
const PojaConfEditFacade = withPojaConfVersionCheck(PojaConfEdit);

export {
  PojaConfViewFacade as PojaConfView,
  PojaConfFFFacade as PojaConfFF,
  PojaConfEditFacade as PojaConfEdit,
};
