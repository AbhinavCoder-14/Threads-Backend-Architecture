import { ApolloServer } from "@apollo/server";
import { gql } from "@apollo/client";
import { prismaClient } from "../lib/db";
import { User } from "../graphql/user/index";

//typeDefs	Define the structure of your API
//resolvers	Functions that fetch or modify data when you run a query/mutation

async function CreateApolloGraphQlSever() {
  const gqlServer = new ApolloServer({
    typeDefs: gql`
          type Query {
            hello:String
            ${User.queries}

          }
          type Mutation{
            ${User.mutations}
            
          }
        `,
    resolvers: {
      Query: {
        ...User.resolvers.queries,
      },
      Mutation: {
        ...User.resolvers.Mutation,
      },
    },
  });

  await gqlServer.start();
  return gqlServer;
}

export default CreateApolloGraphQlSever;
