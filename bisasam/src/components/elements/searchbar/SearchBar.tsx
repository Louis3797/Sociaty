import React, { useCallback, useEffect, useState } from "react";
import { Input } from "../input/Input";

import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import DataList from "./DataList";
import { ApolloError, useLazyQuery } from "@apollo/client";
import { SEARCH_FOR_USER } from "../../../graphql/querys";

interface QueryProps {
  searchForUser: any;
  loading: boolean;
  error: ApolloError;
}

const SearchBar: React.FC<
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > & {
    textarea?: boolean;
    rows?: number;
  }
> = ({ textarea, rows, ref: _, className, ...props }) => {
  // store given query in state
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [getUser, { loading, error, data }] =
    useLazyQuery<QueryProps>(SEARCH_FOR_USER);

  useEffect(() => {
    // if state of searchQuery is changing than check if the length is greater than 0,
    // if yes than query for user data

    if (searchQuery.length > 2) {
      setTimeout(() => getUser({ variables: { name: searchQuery } }), 1000);
    }
  }, [getUser, searchQuery]);

  return (
    <div className="flex flex-col h-auto w-full items-center relative">
      <div className="flex flex-row items-center h-auto px-2 w-full bg-primary-700 rounded-5 py-1 mx-2">
        <SearchRoundedIcon
          fontSize="default"
          className="text-primary-300 mr-2"
        />
        <Input
          textarea={textarea}
          rows={rows}
          {...props}
          className="placeholder-primary-300 text-sm"
          onChange={(e) => setSearchQuery(e.currentTarget.value)}
        />
      </div>
      <div className="flex absolute w-full z-10 flex-col mt-1 justify-center top-full">
        {searchQuery.length > 2 && <DataList user={data?.searchForUser} />}
      </div>
    </div>
  );
};

export default SearchBar;
