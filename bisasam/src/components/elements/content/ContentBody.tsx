export interface ContentBodyProps {
  text: string;
}

const ContentBody: React.SFC<ContentBodyProps> = ({ text }) => {
  return (
    <div className="w-full h-auto bg-transparent mt-1">
      <p className="break-words mr-5 ml-4 mb-4 text-secondary font-medium">
        {text}
      </p>
    </div>
  );
};

export default ContentBody;
