import { useScreenType } from "../../hooks/useScreenType";
import MiddlePanel from "../modules/panels/MiddlePanel";
import RightPanel from "../modules/panels/RightPanel";
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
          <div className="flex w-full h-full bg-transparent">
            <div className="flex w-full h-full bg-transparent justify-center">
              <MiddlePanel>{children}</MiddlePanel>

              <RightPanel>{rightPanel}</RightPanel>
            </div>
          </div>
        </>
      );
      break;
    case "1-cols":
      return (
        <>
          <div className="flex w-full h-full bg-transparent">
            <div className="flex w-full h-full bg-transparent justify-center">
              <MiddlePanel>{children}</MiddlePanel>
            </div>
          </div>
        </>
      );
      break;
    case "fullscreen":
      return (
        <>
          <div className="flex w-full h-full bg-transparent">
            <div className="flex w-full h-full bg-transparent justify-center">
              <div className="flex w-full h-full justify-center px-3">
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
