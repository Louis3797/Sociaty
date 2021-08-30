import { useQuery } from "@apollo/client";
import React from "react";
import { GET_CONTENT_LIKE_STATUS } from "../../../graphql/querys";
import CommentField from "../../elements/comment/CommentField";
import CommentsBox from "../../elements/content/single/CommentsBox";
import ContentBody from "../../elements/content/single/ContentBody";
import ContentHead from "../../elements/content/single/ContentHead";
import ContentItemList from "../../elements/content/single/ContentItems";
import { SCContext } from "../../templates/ContentPage/ContentPage";

const SingleContent: React.FC = () => {
  const tempData = React.useContext(SCContext);
  const contentData = tempData.getSingleUserContent;

  const { loading, error, data } = useQuery(GET_CONTENT_LIKE_STATUS, {
    variables: {
      contentId: contentData.id,
      currentUserId: window.sessionStorage.getItem("UID"),
    },
  });

  return (
    <div className="flex flex-col w-full h-full space-y-4">
      <div className="flex flex-col w-full h-full bg-primary-800 pt-1 rounded-8">
        <ContentHead
          img={contentData.user.image}
          name={contentData.user.name}
          userId={contentData.userId}
          contentId={contentData.id}
          displayName={contentData.user.displayName}
        />
        <ContentBody
          text={contentData.content_text}
          gifUrl={contentData.gif_url}
        />
        <div className="w-full mt-5" />
        <ContentItemList
          contentId={contentData.id}
          userId={contentData.userId}
          commentAmount={contentData.numComments}
          likeAmount={contentData.numLikes}
          time={contentData.created_at}
          liked={data?.getContentLikeStatus?.favourite}
        />
      </div>
      <CommentField contentId={contentData.id} />
      <div className="flex flex-col w-full h-full rounded-8">
        <CommentsBox contentId={contentData.id} />
      </div>
    </div>
  );
};

export default SingleContent;
