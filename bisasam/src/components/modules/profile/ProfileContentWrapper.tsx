import ContentEmptyState from "../content/ContentEmptyState";

interface ProfileContentWrapperProps {
  children: React.ReactNode | null;
}

const ProfileContentWrapper: React.FC<ProfileContentWrapperProps> = ({
  children,
}) => {
  return (
    <div className="flex flex-col w-full h-full bg-transparent items-center justify-start mt-10">
      {children === null ? <ContentEmptyState /> : children}
    </div>
  );
};

export default ProfileContentWrapper;
