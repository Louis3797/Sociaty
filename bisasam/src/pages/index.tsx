import { Dashboard } from "../components/templates/Dashboard/Dashboard";
import MainLayout from "../components/layouts/MainLayout";

export const Home = () => {
  return (
    <div>
      <MainLayout>
        <Dashboard />
      </MainLayout>
    </div>
  );
};

export default Home;
