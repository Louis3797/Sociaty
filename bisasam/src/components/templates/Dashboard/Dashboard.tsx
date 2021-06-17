import Feed from "../../modules/Feed";
import MainLayout from "../../layouts/MainLayout";

export const Dashboard: React.FC = () => {
  return (
    <MainLayout rightPanel={<h1>Hallooooo</h1>}>
      <div className="flex flex-col w-full items-center bg-transparent h-auto">
        <Feed>
          <h1>Hallooooo</h1>
        </Feed>
      </div>
    </MainLayout>
  );
};
export default Dashboard;
