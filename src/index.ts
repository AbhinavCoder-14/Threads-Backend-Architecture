import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
// import cors from 'cors';

async function init() {
  const app = express();

  const PORT = Number(process.env.PORT || 8000);
  app.use(express.json)

  const gqlServer = new ApolloServer({
    typeDefs: "",
    resolvers: {},
  });
  await gqlServer.start();

  app.use("/graphql",expressMiddleware(gqlServer))

  app.get("/", (req, res) => {
    res.json({
      message: "server is up and running",
    });
  });

  app.listen(PORT, () => console.log("Server started at", PORT));
}
