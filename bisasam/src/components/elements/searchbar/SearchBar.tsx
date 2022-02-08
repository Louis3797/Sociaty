import React, { useEffect, useState } from "react";
import { Input } from "../input/Input";

import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import DataList from "./DataList";

const SearchBar: React.FC<
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > & {
    textarea?: boolean;
    rows?: number;
  }
> = ({ textarea, rows, ref: _, className, ...props }) => {
  const [seachQuery, setSearchQuery] = useState<string>("");

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
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="flex absolute w-full z-10 flex-col mt-1 justify-center top-full">
        {seachQuery.length > 0 && <DataList />}
      </div>
    </div>
  );
};

export default SearchBar;
