import {GetListParams} from "react-admin";

const MAX_ITEM_PER_PAGE = 500;

export const normalizeParams = (resource: string, params: GetListParams) => {
  const pagination = {...params.pagination};
  if (pagination.page === 0) {
    pagination.page = 1;
  }
  if (pagination.perPage > MAX_ITEM_PER_PAGE) {
    console.warn(
      `Page size is too big, truncating to MAX_ITEM_PER_PAGE=${MAX_ITEM_PER_PAGE}: resourceType=${resource}, requested pageSize=${pagination.perPage}`
    );
    pagination.perPage = MAX_ITEM_PER_PAGE;
  }
  return {...params, pagination};
};

export const toArchived = <T extends {id: string; archived?: boolean}>(
  record: T
) => {
  return {
    ...record,
    archived: true,
  };
};
