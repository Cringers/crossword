import { gql } from "apollo-server";

export const typeDefs = gql`
    type Test {
    name: String!
    id: String!
    }

    type Query{
    test: Test! 
    }
`
