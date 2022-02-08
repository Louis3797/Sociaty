import { NextApiRequest, NextApiResponse } from "next";
import React from "react";
import { initializeApollo } from "../../../lib/apolloClient";

interface FollowingsProps {}
const Followings: React.FC<FollowingsProps> = () => {
  return <div></div>;
};

export default Followings;

// export const getServerSideProps = async (context: {
//   req: NextApiRequest;
//   res: NextApiResponse;
//   query: { name: string};
// }): Promise<
//   | {
//       notFound: boolean;
//       props?: undefined;
//     }
//   | {
//       props: {
//         data: any;
//       };
//       notFound?: undefined;
//     }
// > => {
//   const { name } = context.query;
//   const apolloClient = initializeApollo();

//   const { data } = await apolloClient.query({
//     query: ,
//     variables: { displayName: name },
//   });

//   if (data.getUserData === null) {
//     return {
//       notFound: true,
//     };
//   }

//   return {
//     props: {
//       data,
//     },
//   };
// };
