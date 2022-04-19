import { AppDataSource } from '@crossword/db';
import { Crossword as CrosswordEntity } from './entities/crossword';
import { Resolvers, Test, Crossword } from './generated/graphql';

export const resolvers: Resolvers = {
   Query: {
      test: (): Test => ({
         name: 'ethan is resolved',
         id: 'balls',
      }),
      crossword: async (): Promise<Crossword> => {
         const { name } = await AppDataSource.manager.findOneBy(
            CrosswordEntity,
            {
               name: 'cringe',
            },
         );
         return {
            name,
            id: 'someId',
            grid: {
               dimension: 2,
               points: [
                  {
                     x: 0,
                     y: 0,
                     value: 'd',
                     first: true,
                     across: true,
                     hint: 1,
                  },
                  {
                     x: 1,
                     y: 0,
                     value: 'd',
                     first: true,
                     across: true,
                     hint: 1,
                  },
                  {
                     x: 0,
                     y: 1,
                     value: 'd',
                     first: true,
                     across: true,
                     hint: 1,
                  },
                  {
                     x: 1,
                     y: 1,
                     value: 'd',
                     first: true,
                     across: true,
                     hint: 1,
                  },
               ],
            },
         };
      },
   },
};
