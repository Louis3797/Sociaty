import { useScreenType } from "../../hooks/useScreenType";
interface MainLayoutProps {
  tabletSidebar?: React.ReactNode;
  leftPanel?: React.ReactNode;
  rightPanel?: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, rightPanel }) => {
  const screenType = useScreenType();

  switch (screenType) {
    case "2-cols":
      return (
        <>
          <div className="flex w-full h-full bg-transparent justify-center">
            <div className="flex flex-wrap w-3/5 h-full mt-15 bg-transparent justify-center">
              <div className="flex w-2/4 h-full bg-success justify-center p-4 mx-4">
                {children}
              </div>
              <div className="flex w-3/12 h-full bg-error  justify-center p-4 mx-4">
                {rightPanel}
              </div>
            </div>
          </div>
        </>
      );
      break;
    case "2-cols-full":
      return (
        <>
          <div className="flex w-full h-full bg-transparent justify-center">
            <div className="flex flex-wrap w-full h-full mt-15 bg-transparent justify-center">
              <div className="flex w-2/4 h-full bg-success justify-center p-4 mx-4">
                {children}
              </div>
              <div className="flex w-3/12 h-full bg-error  justify-center p-4 mx-4">
                {rightPanel}
              </div>
            </div>
          </div>
        </>
      );
      break;
    case "fullscreen":
      return (
        <>
          <div className="flex w-full h-full bg-transparent justify-center">
            <div className="flex flex-wrap w-full h-full mt-15 bg-warn justify-between">
              <div className="flex w-full h-full bg-success justify-center p-4">
                {children}
              </div>
            </div>
          </div>
        </>
      );
      break;
  }
};

export default MainLayout;
