import { PrimaryGeneratedColumn, Column, Entity } from "typeorm";

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ default: "" })
  description: string;

  @Column({ default: false })
  isCompleted: boolean;
}
