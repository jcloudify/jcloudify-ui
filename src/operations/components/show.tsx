import {Loading, useShowContext} from "react-admin";

export interface ShowLayoutProps {
  children: React.ReactNode;
  loading?: boolean;
}

/**
 * Show layout that displays Loading UI when the record is loading unlike the <SimpleShowLayout /> which returns null
 * Note that it doesnt display any base layout just as ShowBase
 */
export const ShowLayout: React.FC<ShowLayoutProps> = ({children, loading}) => {
  const {record, isLoading} = useShowContext();

  if (isLoading || loading)
    return <Loading loadingPrimary="" loadingSecondary="" />;

  if (!record) return null;

  return children;
};
