import { Resolvers } from "./generated/graphql";
import { Test } from "./generated/graphql"

export const resolvers: Resolvers = {
  Query: {
    test: () : Test => {
        return { 
          name: "ethan is resolved",
          id: "balls"
        }
    }
  },
};
