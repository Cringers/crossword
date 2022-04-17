import { Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Crossword {
    @PrimaryColumn('varchar')
    name: string
}