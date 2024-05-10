import {Loading, useShowContext} from "react-admin";

/**
 * Show layout that displays Loading UI when the record is loading unlike the <SimpleShowLayout /> which returns null
 * Note that it doesnt display any base layout just as ShowBase
 */
export const ShowLayout: React.FC<React.PropsWithChildren> = ({children}) => {
  const {record, isLoading} = useShowContext();

  if (isLoading) return <Loading loadingPrimary="" loadingSecondary="" />;

  if (!record) return null;

  return children;
};
