import React from "react";
import { SingleContentProps } from "SingleContent";
import MainLayout from "../../layouts/MainLayout";
import SingleContent from "../../modules/content/SingleContent";

export const SCContext = React.createContext(null);

const ContentPage: React.FC<SingleContentProps> = ({ data }) => {
  return (
    <MainLayout rightPanel={null}>
      <SCContext.Provider value={data}>
        <SingleContent />
      </SCContext.Provider>
    </MainLayout>
  );
};

export default ContentPage;
