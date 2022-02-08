import React from "react";
import ResultItem from "./ResultItem";

interface DataListProps {}

const DataList: React.FC<DataListProps> = ({}) => {
  return (
    <div className="flex flex-col h-auto bg-primary-600 w-full rounded-5 transition duration-1000 ease-in-out ring-1 ring-primary-300">
      <ResultItem text="Louis" />
      <ResultItem text="Bob" />
      <ResultItem text="Niklas" />
      <ResultItem text="justus" />
    </div>
  );
};

export default DataList;
