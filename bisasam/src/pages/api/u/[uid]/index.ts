import { GET_USER_WITH_ID } from "../../../../graphql/querys";
import { initializeApollo } from "../../../../lib/apolloClient";

export default async function handler(req, res) {
  const { uid: uid } = req.query;

  const apolloClient = initializeApollo();

  const { data } = await apolloClient.query({
    query: GET_USER_WITH_ID,
    variables: { id: parseInt(uid) },
  });

  res.status(200).json(JSON.stringify(data));
}
