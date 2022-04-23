import { gql } from 'apollo-server-express';

export const typeDefs = gql`
   type Query {
      crossword: Crossword!
   }

   type Crossword {
      name: String!
      id: String!
      grid: Grid!
      answers: Answers!
   }

   type Answers {
      across: [Answer!]!
      down: [Answer!]!
   }

   type Answer {
      key: Int!
      clue: String!
      answer: String!
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
