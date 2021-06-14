interface CONTENT {
  getContent: any;
}

interface ContentPageProps {
  data: CONTENT;
}

const ContentPage: React.FC<ContentPageProps> = () => {
  return (
    <div className="flex flex-col w-full h-screen bg-primary-900 items-center">
      <div className="flex flex-col max-w-2xl items-center bg-error mt-15 h-15"></div>
    </div>
  );
};

export default ContentPage;
