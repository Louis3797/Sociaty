export interface FeedProps {
  children?: React.ReactNode;
}

const Feed: React.FC<FeedProps> = ({ children }) => {
  return <div>{children}</div>;
};

export default Feed;
