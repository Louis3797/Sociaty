import { CircularProgress } from "@material-ui/core";
import { useRouter } from "next/router";
import React from "react";
import NotFoundItem from "./NotFoundItem";
import ResultItem from "./ResultItem";

interface DataListProps {
  user: {
    id: string;
    name: string | null;
    displayName: string;
    image: string | null;
    online: boolean | null;
  }[];
  loading: boolean;
}

const DataList: React.FC<DataListProps> = ({ user, loading }) => {
  const router = useRouter();
  return (
    <div className="flex flex-col h-auto bg-primary-600 w-full rounded-5 transition duration-1000 ease-in-out ring-1 ring-primary-300">
      {loading == true ? (
        <div className="flex w-full h-full items-center justify-center bg-transparent">
          <CircularProgress />
        </div>
      ) : !!user && user.length > 0 ? (
        user.map((u) => (
          <ResultItem
            name={u.name}
            displayName={u.displayName}
            image={u.image}
            key={u.id}
            onClick={() =>
              (window.location.href = `/u/${encodeURIComponent(
                decodeURIComponent(
                  // @ts-ignore
                  u.displayName
                ).replace(/\s+/g, "")
              )}`)
            }
          />
        ))
      ) : (
        <NotFoundItem />
      )}
    </div>
  );
};

export default DataList;
