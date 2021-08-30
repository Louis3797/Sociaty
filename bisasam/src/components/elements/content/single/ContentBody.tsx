import Link from "next/link";
import React from "react";

export interface ContentBodyProps {
  text: string;
  gifUrl: string;
}

const ContentBody: React.FC<ContentBodyProps> = ({ text, gifUrl }) => {
  return (
    <div className="w-full h-auto bg-primary-800 mt-1 rounded-8">
      <p className="break-words mr-5 ml-4 mb-4 text-secondary font-medium">
        {text}
      </p>
      {gifUrl.length > 0 && (
        <div className="flex w-full h-auto justify-end px-4 rounded-20">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={gifUrl}
            alt="gif"
            className="w-full h-auto object-fit rounded-20"
          />
        </div>
      )}
    </div>
  );
};

export default ContentBody;
