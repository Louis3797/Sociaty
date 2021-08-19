import { GetServerSideProps } from "next";
import { SingleContentProps } from "SingleContent";
import ContentPage from "../../../../components/templates/ContentPage/ContentPage";

const Contribution: React.FC<SingleContentProps> = ({ data }) => {
  return <ContentPage data={data} />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id: id, contentId: contentId } = context.query;

  const res = await fetch(
    `http://localhost:3000/api/u/${id}/contribution/${contentId}`
  );

  const data = await res.json();

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      data,
    },
  };
};
export default Contribution;
