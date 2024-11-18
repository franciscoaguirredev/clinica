import { Commit } from 'src/modules/commits/entities/commit.entity';
import { User } from 'src/modules/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Appointment {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar', {
    length: 255,
    nullable: false,
    name: 'reason',
  })
  reason: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  date: Date;

  @OneToMany(() => Commit, (commit) => commit.appointment)
  commits: Commit[];

  @ManyToOne(() => User, (user) => user.appointments)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => User, (user) => user.attendedAppointments)
  @JoinColumn({ name: 'doctorId' })
  doctor: User;
}
