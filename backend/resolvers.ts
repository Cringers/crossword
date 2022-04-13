import { Resolvers, Test, Crossword } from "./generated/graphql";

export const resolvers: Resolvers = {
  Query: {
    test: () : Test => {
        return { 
          name: "ethan is resolved",
          id: "balls"
        }
    },
    crossword: () : Crossword => {
      return {
          name: "someName",
          id: "someId",
          grid: [ {
           x: 0,
           y: 0,
           value: "d"
          }]
      }
    }
  },
};
