import ContentPage from "../../../../components/templates/ContentPage/ContentPage";

interface CONTENT {
  getContent: any;
}
interface ContributionProps {
  data: CONTENT;
}

const Contribution: React.FC<ContributionProps> = ({ data }) => {
  return <ContentPage data={data} />;
};

export async function getServerSideProps(context) {
  //Das hier ist falsch

  const { id: id } = context.query;
  const { contentId: contentId } = context.query;

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
}
export default Contribution;
