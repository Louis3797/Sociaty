import Link from "next/link";
import React from "react";

interface ContentBodyProps {
  text: string;
  userId: string;
  contentId: string;
  gifUrl: string;
}

const ContentBody: React.FC<ContentBodyProps> = ({
  text,
  userId,
  contentId,
  gifUrl,
}) => {
  return (
    <>
      <Link href={`/u/${userId}/contribution/${contentId}`}>
        <div className="w-full h-auto bg-primary-800 mt-1 rounded-8">
          <p className="break-words mr-5 ml-4 mb-4 text-secondary text-opacity-80 font-medium">
            {text}
          </p>
          {gifUrl.length > 0 && (
            <div className="flex w-full h-auto justify-end px-4 mb-2 rounded-20">
              <img
                src={gifUrl}
                alt="gif"
                className="w-full h-auto object-fit rounded-20"
              />
            </div>
          )}
        </div>
      </Link>
    </>
  );
};

export default ContentBody;
