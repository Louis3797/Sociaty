import Navbar from "../modules/Navbar";

export interface NavLayoutProps {
  children: React.ReactNode;
}

const NavLayout: React.SFC<NavLayoutProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default NavLayout;
