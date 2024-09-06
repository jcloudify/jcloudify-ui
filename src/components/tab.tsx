import {createContext, useState, useContext, useMemo, useEffect} from "react";
import {Link, useLocation, useSearchParams} from "react-router-dom";
import {
  Stack,
  Tabs as MUITabs,
  TabsProps as MUITabsProps,
  Tab as MUITab,
  TabProps as MUITabProps,
} from "@mui/material";
import {colors} from "@/themes";

export type TabValue = string;

interface TabContextValue {
  value: string;
  setValue: (value: string) => void;
  tabs: string[];
}

export const TabContext = createContext<TabContextValue>({} as any);

export const useTabContext = () => useContext(TabContext);

export type TabsProps = Omit<MUITabsProps, "onChange" | "value"> &
  React.PropsWithChildren<{
    tabs: TabValue[];
    /**
     * default tab value
     */
    initialValue?: string;
    tabProps?: MUITabProps;
    solid?: boolean;

    asLink?: boolean;
    baseRouterLink?: string;
  }>;

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  children,
  asLink = false,
  baseRouterLink,
  solid = false,
  tabProps = {},
  ...props
}) => {
  const [p] = useSearchParams();
  const [value, setValue] = useState(tabs[0]);

  const {pathname} = useLocation();

  useEffect(() => {
    const setDefaultTab = () => {
      /*
       * auto tab syncing according to path is not extensible enough when path becomes more complicated,
       * instead use **<WithTab />** component for your pages
       */
      if (!value) {
        setValue(tabs[0]);
      }
    };
    setDefaultTab();
  }, [tabs, pathname, asLink, value]);

  if (!tabs.length) throw new Error("at least 1 tab is required");

  return (
    <TabContext.Provider
      value={useMemo(
        () => ({
          value: value || "",
          setValue,
          tabs,
        }),
        [value, tabs]
      )}
    >
      <MUITabs
        onChange={(_ev, newTab) => setValue(newTab)}
        value={value}
        indicatorColor="primary"
        variant="fullWidth"
        allowScrollButtonsMobile
        {...props}
      >
        {tabs.map((tab) => (
          <MUITab
            key={tab}
            {...tabProps}
            value={tab}
            label={tab}
            component={asLink ? Link : "div"}
            to={`${baseRouterLink ? `${baseRouterLink}/` : ""}${tab.toLowerCase()}?${p}`}
            sx={{
              "textTransform": "none",
              "textDecoration": "none !important",
              "border": "0 !important",
              "&.Mui-selected": solid
                ? {
                    bgcolor: "#fff !important",
                    border: `1px solid ${colors("gray-0")}`,
                  }
                : {},
              ...tabProps.sx,
            }}
          />
        ))}
      </MUITabs>
      {children}
    </TabContext.Provider>
  );
};

export const WithTab: React.FC<React.PropsWithChildren<{tab: string}>> = ({
  tab,
  children,
}) => {
  const {setValue} = useTabContext();
  const location = useLocation();
  useEffect(() => {
    setValue(tab);
  }, [tab, location]);
  return children;
};

export type TabViewProps = React.PropsWithChildren<{
  tab: string;
}>;

export const TabView: React.FC<TabViewProps> = ({children, tab}) => {
  const {value} = useTabContext();
  const isCurrent = tab === value;
  return isCurrent ? (
    <Stack sx={{width: "100%"}} role="tabpanel" hidden={!isCurrent}>
      {children}
    </Stack>
  ) : null;
};
