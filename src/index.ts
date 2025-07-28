import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import { prismaClient } from "../lib/db.ts";
// import cors from 'cors';

async function init() {
  const app = express();

  const PORT = Number(process.env.PORT || 8000);
  app.use(express.json);

  const gqlServer = new ApolloServer({
    typeDefs: `
      type Query {
        hello:String
        say(name:String):String
      }
      type Mutation{
        createUser(email:String!,lastName:String!,firstName:String!,password:String!): Boolean
      }
    
    `,
    resolvers: {
      Mutation: {
        createUser: async (
          _,
          {
            firstName,
            lastName,
            email,
            password,
          }: {
            firstName: string;
            lastName: string;
            email: string;
            password: string;
          }
        ) => {
          await prismaClient.user.create({
            data: {
              email,
              password,
              firstName,
              lastName,
              salt: "random_ass",
            },
          });
        },
      },
    },
  });

  await gqlServer.start();

  app.use("/graphql", expressMiddleware(gqlServer));

  app.get("/", (req, res) => {
    res.json({
      message: "server is up and running",
    });
  });

  app.listen(PORT, () => console.log("Server started at", PORT));
}
