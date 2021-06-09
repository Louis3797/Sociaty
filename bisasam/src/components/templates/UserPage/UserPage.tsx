import React from "react";
import Content from "../../elements/content/Content";
import ProfileFeed from "../../modules/profile/ProfileFeed";
import ProfileHeader from "../../modules/profile/ProfileHeader";
import ProfileInfoBox from "../../modules/profile/ProfileInfoBox";

export interface UserProps {
  findUser: any;
}

interface UserPageProps {
  data?: UserProps;
}

const UserPage: React.FC<UserPageProps> = ({ data }) => {
  console.log(data);
  const userContent = data.findUser.content.map((content) => {
    return (
      <Content
        key={content.content_id.toString()}
        userId={content.user.id}
        contentId={content.content_id}
        name={content.user.name}
        userImg={content.user.image}
        text={content.content_text}
        likeAmount={content.liked === null ? 0 : content.liked.length}
        commentAmount={content.comments === null ? 0 : content.comments.length}
        //How can we proof faster
        liked={content.liked.length === 1 ? true : false}
      />
    );
  });

  return (
    <div className="flex flex-col w-full h-screen bg-primary-900 items-center">
      <div className="flex flex-col max-w-2xl items-center bg-transparent mt-15 h-auto">
        <ProfileHeader
          name={data.findUser.name}
          img={data.findUser.image}
          email={data.findUser.email}
          bio={data.findUser.bio ? data.findUser.bio : "Hey im new here"}
        />
        <ProfileInfoBox follower={0} follows={0} posts={0} />
        <div className="flex flex-col w-full h-full bg-transparent items-center justify-start mt-10">
          {userContent}
        </div>
      </div>
    </div>
  );
};

export default UserPage;
