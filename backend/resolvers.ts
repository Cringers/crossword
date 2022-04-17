import { AppDataSource } from '@crossword/db';
import { Crossword as CrosswordEntity} from './entities/crossword';
import { Resolvers, Test, Crossword } from './generated/graphql';

export const resolvers: Resolvers = {
  Query: {
    test: (): Test => {
      return {
        name: 'ethan is resolved',
        id: 'balls',
      };
    },
    crossword: async (): Promise<Crossword> => {
      let name : string = (await AppDataSource.manager.findOneBy(CrosswordEntity,{name: "cringe"})).name
      return {
        name,
        id: 'someId',
        grid: [
          {
            x: 0,
            y: 0,
            value: 'd',
            first: true,
            across: true,
            hint: 1,
          },
        ],
      };
    },
  },
};
