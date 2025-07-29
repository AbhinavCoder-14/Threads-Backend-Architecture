import { gql } from "@apollo/client";

export const mutations = gql`
    createUser(email:String!,lastName:String!,firstName:String!,password:String!): String
`;
