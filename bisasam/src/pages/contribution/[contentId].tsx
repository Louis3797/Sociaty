import { SingleContentProps } from "SingleContent";
import ContentPage from "../../components/templates/ContentPage/ContentPage";
import { initializeApollo } from "../../lib/apolloClient";
import jwt from "next-auth/jwt";
import { GET_SINGLE_CONTENT } from "../../graphql/querys";
import { NextApiRequest, NextApiResponse } from "next";

const secret = process.env.SECRET;

const Contribution: React.FC<SingleContentProps> = ({ data }) => {
  return <ContentPage data={data} />;
};
export const getServerSideProps = async (context: {
  req: NextApiRequest;
  res: NextApiResponse;
  query: { contentId: string };
}): Promise<
  | {
      notFound: boolean;
      props?: undefined;
    }
  | {
      props: {
        data: any;
      };
      notFound?: undefined;
    }
> => {
  const { contentId } = context.query;

  const req = context.req;

  const token = await jwt.getToken({ req, secret: process.env.SECRET });

  const apolloClient = initializeApollo();

  const { data } = await apolloClient.query({
    query: GET_SINGLE_CONTENT,
    variables: { userId: token?.sub, contentId: contentId },
  });

  if (data.getSingleUserContent === null) {
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
