import { Appointment } from "src/modules/appointments/entities/appointment.entity";
import { User } from "src/modules/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Commit {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column('text', { nullable: false })
    content: string; 

    @Column({
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
    })
    createdAt: Date;

    @ManyToOne(() => Appointment, (appointment) => appointment.commits, { nullable: false })
    @JoinColumn({ name: 'appointmentId' }) 
    appointment: Appointment;

    
    @ManyToOne(() => User, (user) => user.commits, { nullable: false })
    @JoinColumn({ name: 'userId' }) 
    user: User;
}

