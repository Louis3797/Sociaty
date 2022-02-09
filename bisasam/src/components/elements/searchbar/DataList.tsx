import { User } from "@prisma/client";
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
}

const DataList: React.FC<DataListProps> = ({ user }) => {
  return (
    <div className="flex flex-col h-auto bg-primary-600 w-full rounded-5 transition duration-1000 ease-in-out ring-1 ring-primary-300">
      {user.length > 0 ? (
        user.map((u) => (
          <ResultItem
            name={u.name}
            displayName={u.displayName}
            image={u.image}
            key={u.id}
          />
        ))
      ) : (
        <NotFoundItem />
      )}
    </div>
  );
};

export default DataList;
