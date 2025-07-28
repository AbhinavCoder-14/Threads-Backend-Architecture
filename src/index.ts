import express from "express";
import CreateApolloGraphQlSever from "./graphql/index";
import { expressMiddleware } from "@as-integrations/express5";
import { prismaClient } from "./lib/db";



// import cors from 'cors';

async function init() {
  const app = express();

  const PORT = Number(8000);
  app.use(express.json());

  const gqlServer = await CreateApolloGraphQlSever();
  app.use("/graphql", expressMiddleware(gqlServer));

  app.get("/", (req, res) => {
    res.json({
      message: "server is up and running",
    });
  });

  app.listen(PORT, () => console.log("Server started at", PORT));
}


init()