import { GET_USER } from "../../../../graphql/querys";
import { initializeApollo } from "../../../../lib/apolloClient";

export default async function handler(req, res) {
  const { uid: uid } = req.query;

  const apolloClient = initializeApollo();

  const { data } = await apolloClient.query({
    query: GET_USER,
    variables: { id: uid },
  });

  res.status(200).json(JSON.stringify(data));
}
