interface MiddlePanelProps {}

const MiddlePanel: React.FC<MiddlePanelProps> = ({ children }) => {
  return (
    <div className="flex flex-col w-48 h-full mx-3 px-5">
      <div className="mt-10">{children}</div>
    </div>
  );
};

export default MiddlePanel;
