import {createContext, useState, useContext, useMemo, useEffect} from "react";
import {Link, useLocation, useSearchParams} from "react-router-dom";
import {
  Stack,
  Tabs as MUITabs,
  TabsProps as MUITabsProps,
  Tab as MUITab,
  TabProps as MUITabProps,
} from "@mui/material";

export type TabValue = string;

interface TabContextValue {
  value: string;
  setValue: (value: string) => void;
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
    asLink?: boolean;
  }>;

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  children,
  asLink = false,
  tabProps = {},
  ...props
}) => {
  const [p] = useSearchParams();
  const [value, setValue] = useState(tabs[0]);

  const {pathname} = useLocation();

  useEffect(() => {
    const syncTabWithCurrentPath = () => {
      let synced = false;
      if (asLink) {
        for (let tab of tabs) {
          if (pathname.endsWith(tab.toLowerCase())) {
            synced = true;
            setValue(tab);
            break;
          }
        }
      }
      if (!synced) {
        setValue(tabs[0]);
      }
    };
    syncTabWithCurrentPath();
  }, [tabs, pathname, asLink]);

  if (!tabs.length) throw new Error("at least 1 tab is required");

  return (
    <TabContext.Provider
      value={useMemo(
        () => ({
          value: value || "",
          setValue,
        }),
        [value]
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
            value={tab}
            label={tab}
            component={asLink ? Link : "div"}
            to={`${tab.toLowerCase()}?${p}`}
            sx={{
              textTransform: "none",
            }}
          />
        ))}
      </MUITabs>
    </TabContext.Provider>
  );
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
