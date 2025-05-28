import queryString from "query-string";

interface UrlQueryParams {
  params: string;
  key: string;
  value: string;
}

interface RemoveUrlQueryParams {
  params: string;
  keystoRemove: string[];
}
export const formUrlQueryString = ({ params, key, value }: UrlQueryParams) => {
  const currentUrl = queryString.parse(params);
  currentUrl[key] = value;
  return queryString.stringifyUrl({
    url: window.location.pathname, // It takes the current page's path
    query: currentUrl,
  });
};

// To create a new URL string with specified query parameters removed.

export const removeUrlQueryString = ({
  params,
  keystoRemove,
}: RemoveUrlQueryParams) => {
  const currentQuery = queryString.parse(params);

  keystoRemove.forEach((key) => {
    delete currentQuery[key];
  });
  return queryString.stringifyUrl(
    {
      url: window.location.pathname, // It takes the current page's path
      query: currentQuery,
    },
    { skipNull: true }
  );
};
