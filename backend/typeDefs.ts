import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Test {
    name: String!
    id: String!
  }

  type Query {
    test: Test!
    crossword: Crossword!
  }

  type Crossword {
    name: String!
    id: String!
    grid: Grid!
  }

  type Grid {
    dimension: Int!
    points: [Point!]! 
  }

  type Point {
    x: Int!
    y: Int!
    value: String!
    hint: Int!
    first: Boolean!
    across: Boolean!
  }
`;
