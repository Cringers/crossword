import { gql } from "apollo-server-express";

export const typeDefs = gql`
    type Test {
    name: String!
    id: String!
    }

    type Query{
    test: Test! 
    }
`
