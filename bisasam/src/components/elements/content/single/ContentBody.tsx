import Link from "next/link";
import React from "react";

export interface ContentBodyProps {
  text: string;
  userId: string;
  contentId: string;
}

const ContentBody: React.FC<ContentBodyProps> = ({
  text,
  userId,
  contentId,
}) => {
  return (
    <>
      <Link href={`/u/${userId}/contribution/${contentId}`}>
        <div className="w-full h-auto mt-3">
          <p className="break-words mr-5 ml-4 text-secondary font-medium">
            {text}
          </p>
        </div>
      </Link>
    </>
  );
};

export default ContentBody;
