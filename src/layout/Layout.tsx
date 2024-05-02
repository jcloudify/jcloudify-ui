import {LayoutComponent, Layout as RALayout} from "react-admin";
import {AppBar, Menu} from "@/layout";

export const Layout: LayoutComponent = (props) => {
  return <RALayout {...props} appBar={AppBar} menu={Menu} />;
};
