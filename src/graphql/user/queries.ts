import { gql } from "@apollo/client";

export const queries = gql`
    getUserToken(email:String!,password:String!) : String

    
`