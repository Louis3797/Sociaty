import React, { useEffect } from "react";
import { SCContext } from "../../../context/SingleContentContext";
import ContentBody from "../../elements/content/single/ContentBody";
import ContentHead from "../../elements/content/single/ContentHead";
import ContentItemList from "../../elements/content/single/ContentItems";

interface QueryProps {
  getIsLikedContent: any;
}
const SingleContent: React.FC = () => {
  const contentData = React.useContext(SCContext);
  const currentUser = window.sessionStorage.getItem("UID");
  const currentContent = contentData.getContent.content_id;

  return (
    <div className="flex flex-col w-full h-full bg-primary-800 rounded-8">
      <ContentHead
        img={contentData.getContent.user.image}
        name={contentData.getContent.user.name}
        userId={contentData.getContent.userId}
        time={contentData.getContent.created_at}
      />
      <ContentBody
        text={contentData.getContent.content_text}
        contentId={contentData.getContent.contentId}
        userId={contentData.getContent.userId}
      />
      <div className="w-full mt-5" />
      <ContentItemList
        contentId={contentData.getContent.contentId}
        commentAmount={
          contentData.getContent.comments === null
            ? 0
            : contentData.getContent.comments.length
        }
        likeAmount={
          contentData.getContent.liked === null
            ? 0
            : contentData.getContent.liked.length
        }
        liked={false}
      />
    </div>
  );
};

export default SingleContent;
