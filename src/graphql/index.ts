
import { ApolloServer } from "@apollo/server";
import { prismaClient } from "../lib/db";
import { User } from "../graphql/user/index";




async function CreateApolloGraphQlSever() {

    const gqlServer = new ApolloServer({
        typeDefs: `
          type Query {
          hello:String
          ${User.queries}

          }
          type Mutation{
          ${User.mutations}
            
          }
        
        `,
        resolvers: {
          Query:{
            ...User.resolvers.queries,
          },
          Mutation: {
            ...User.resolvers.Mutation,

            // createUser: async (
            //   _,
            //   {
            //     firstName,
            //     lastName,
            //     email,
            //     password,
            //   }: {
            //     firstName: string;
            //     lastName: string;
            //     email: string;
            //     password: string;
            //   }
            // ) => {
            //   await prismaClient.user.create({
            //     data: {
            //       email,
            //       password,
            //       firstName,
            //       lastName,
            //       salt: "random_ass",
            //     },
          },
        },
      });
    
      await gqlServer.start();
      return gqlServer
} 


export default CreateApolloGraphQlSever;