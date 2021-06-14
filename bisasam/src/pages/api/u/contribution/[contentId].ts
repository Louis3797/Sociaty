import { GET_CONTENT } from "../../../../graphql/querys";
import { initializeApollo } from "../../../../lib/apolloClient";

export default async function handler(req, res) {
  const { uid: uid } = req.query;
  const { contentId: contentId } = req.query;

  const apolloClient = initializeApollo();

  const { data } = await apolloClient.query({
    query: GET_CONTENT,
    variables: { userId: parseInt(uid), content_id: parseInt(contentId) },
  });

  res.status(200).json(JSON.stringify(data));
}
