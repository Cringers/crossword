import { AppDataSource } from '@crossword/db';
import { Crossword as CrosswordEntity} from './entities/crossword';
import { Resolvers, Crossword, Point } from './generated/graphql';

export const resolvers: Resolvers = {
  Query: {
    crossword: async (): Promise<Crossword> => {
      let crossword : CrosswordEntity = (await AppDataSource.manager.findOneBy(CrosswordEntity,{name: "cringe"}))
      let name : string = crossword.name
      let points : Point[] = []
      crossword.grid.forEach( (row : Array<string>, y)  => {
        row.forEach((value, x) => {
          const point : Point = {
            x,
            y, 
            value,
            first: true,
            across: true,
            hint: 1,
          }
          points.push(point)
        })
      })
      return {
        name,
        id: 'someId',
        grid: {
         dimension: crossword.grid.length,
         points
        },
      };
    },
  },
};
