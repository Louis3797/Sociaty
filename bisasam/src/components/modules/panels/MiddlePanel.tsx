interface MiddlePanelProps {}

const MiddlePanel: React.FC<MiddlePanelProps> = ({ children }) => {
  return (
    <div className="flex flex-col w-42 h-full mx-3 px-5">
      <div className="mt-15">{children}</div>
    </div>
  );
};

export default MiddlePanel;
