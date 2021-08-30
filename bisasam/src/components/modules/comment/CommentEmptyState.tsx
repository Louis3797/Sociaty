export interface CommentEmptyStateProps {}

const CommentEmptyState: React.FC<CommentEmptyStateProps> = () => {
  return (
    <div className="flex flex-col w-full h-full py-5 bg-primary-800 items-center rounded-8 justify-center">
      <h1 className="text-xl text-secondary-600 font-semibold mb-1">
        Wow much empty here
      </h1>
      <p className="text-base text-primary-200 opacity-70 font-base">
        Comment something to fill the empty space
      </p>
    </div>
  );
};

export default CommentEmptyState;
