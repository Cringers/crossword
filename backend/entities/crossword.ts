import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Crossword {
   @PrimaryColumn('varchar')
   name: string;

   @Column('simple-json')
   grid: Array<Array<string>>;
}
