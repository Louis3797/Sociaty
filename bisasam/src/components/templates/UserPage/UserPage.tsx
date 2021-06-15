import React from "react";
import MainLayout from "../../layouts/MainLayout";
import ListContent from "../../modules/content/ListContent";
import ProfileHeader from "../../modules/profile/ProfileHeader";
import ProfileInfoBox from "../../modules/profile/ProfileInfoBox";

export interface UserProps {
  findUser: any;
}

interface UserPageProps {
  data?: UserProps;
}

const UserPage: React.FC<UserPageProps> = ({ data }) => {
  const userContent = data.findUser.content.map((content) => {
    return (
      <ListContent
        key={content.content_id.toString()}
        userId={content.user.id}
        contentId={content.content_id}
        name={content.user.name}
        userImg={content.user.image}
        text={content.content_text}
        likeAmount={content.liked === null ? 0 : content.liked.length}
        commentAmount={content.comments === null ? 0 : content.comments.length}
        liked={content.liked.length === 1}
      />
    );
  });
  return (
    <MainLayout>
      <div className="flex flex-col w-full items-center bg-transparent h-auto">
        <ProfileHeader
          name={data.findUser.name}
          img={data.findUser.image}
          email={data.findUser.email}
          bio={data.findUser.bio ? data.findUser.bio : "Hey im new here"}
        />
        <ProfileInfoBox
          follower={
            data.findUser.followedBy.user === null
              ? 0
              : data.findUser.followedBy.user.length
          }
          follows={
            data.findUser.following.user === null
              ? 0
              : data.findUser.following.user.length
          }
          posts={data.findUser.content.length}
        />
        <div className="flex flex-col w-full h-full bg-transparent items-center justify-start mt-10">
          {userContent}
        </div>
      </div>
    </MainLayout>
  );
};

export default UserPage;
