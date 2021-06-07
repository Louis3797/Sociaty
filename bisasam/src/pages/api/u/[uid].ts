import { GET_USER_WITH_ID } from "../../../graphql/querys";
import { initializeApollo } from "../../../lib/apolloClient";
import prisma from "../../../lib/prismaClient";

export default async function handler(req, res) {
  const { uid } = req.query;

  const apolloClient = initializeApollo();

  // const { data } = await apolloClient.query({
  //   query: GET_USER_WITH_ID,
  //   variables: { id: parseInt(uid) },
  // });

  const data = await prisma.content.findMany({
    where: {
      user_id: parseInt(uid),
    },
    select: {
      User: true,
    },
  });

  res.status(200).json(JSON.stringify(data));
}
