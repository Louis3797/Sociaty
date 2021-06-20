interface SubmitModalHeadProps {}

const SubmitModalHead: React.SFC<SubmitModalHeadProps> = () => {
  return (
    <div className="flex flex-row justify-start py-2 px-3 border-b border-primary-300 h-auto">
      <h1 className="text-2xl font-semibold text-secondary-600 font-sans ">
        Create a Post
      </h1>
    </div>
  );
};

export default SubmitModalHead;
