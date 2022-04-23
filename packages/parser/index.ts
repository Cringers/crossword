import { Crossword } from '@crossword/backend/entities/crossword';
import * as fs from 'fs';
import * as path from 'path';

interface Parser {
   name: string;
   (crossword: string): Crossword;
}

const crosswordParser: Parser = (crossword: string) => {
   const crosswordString: string = fs.readFileSync(path.resolve(__dirname, `../../backend/crosswords/${crossword}`)).toString();
   const crosswordEntity: Crossword = new Crossword();
   const grid = crosswordString.split('\n').map((str) => str.split(''));
   console.log(grid);
   const first = crosswordString.split('\n');
   console.log('first', first);
   crosswordEntity.grid = crosswordString.split('\n').map((str) => str.split(''));
   console.log(crosswordEntity.grid);
   crosswordEntity.name = crossword;
   return crosswordEntity;
};

export { crosswordParser };
