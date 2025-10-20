import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Task } from '../tasks/task.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true }) // already existing users will not have it yet
  phoneNumber: string;
    //one user can have many tasks
  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];
}
