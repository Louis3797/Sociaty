import React from "react";

interface FollowerProps {}

const Follower: React.FC<FollowerProps> = () => {
  return <div></div>;
};

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

export default Follower;
