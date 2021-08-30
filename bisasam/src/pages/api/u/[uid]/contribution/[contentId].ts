import { GET_SINGLE_CONTENT } from "../../../../../graphql/querys";
import { initializeApollo } from "../../../../../lib/apolloClient";

export default async function handler(req, res) {
  const { uid: uid, contentId: contentId } = req.query;

  const apolloClient = initializeApollo();

  const { data } = await apolloClient.query({
    query: GET_SINGLE_CONTENT,
    variables: { userId: uid, contentId: contentId },
  });

  res.status(200).json(JSON.stringify(data));
}
