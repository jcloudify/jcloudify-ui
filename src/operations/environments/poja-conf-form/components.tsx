import {getPojaConfComponent} from "@/operations/environments/poja-conf-form/poja-conf-record";
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
  return <Cmp.view {...props} />;
};

const PojaConfFFFacade: PojaConfFacadeCmp<PojaConfFFComponent> = ({
  version,
  ...props
}) => {
  const Cmp = getPojaConfComponent(version);
  return <Cmp.ff {...props} />;
};

const PojaConfEditFacade: PojaConfFacadeCmp<PojaConfEditComponent> = ({
  version,
  ...props
}) => {
  const Cmp = getPojaConfComponent(version);
  return <Cmp.edit {...props} />;
};

export {
  PojaConfViewFacade as PojaConfView,
  PojaConfFFFacade as PojaConfFF,
  PojaConfEditFacade as PojaConfEdit,
};
