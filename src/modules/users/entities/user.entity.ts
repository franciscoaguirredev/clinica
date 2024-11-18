
import { IRoleId } from "src/common/interfaces/roleId.interface";
import { Appointment } from "src/modules/appointments/entities/appointment.entity";
import { Commit } from "src/modules/commits/entities/commit.entity";
import { Role } from "src/modules/roles/entities/role.entity";
import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class User {
@PrimaryGeneratedColumn('increment')
    id: number

    @Column('varchar', { length: 255, select: false, nullable: false, name: 'name', })
    name:string

    @Column('varchar', {
    unique: true,
    length: 150,
    nullable: false,
    name: 'email',
    })
    email:string

    @Column('varchar', { length: 255, select: false, nullable: false })
    password:string

    @ManyToOne(() => Role, Role => Role.id)
    role: IRoleId;

    @OneToMany(() => Appointment, (appointment) => appointment.user)
    appointments: Appointment[];

    @OneToMany(() => Appointment, (appointment) => appointment.doctor)
    attendedAppointments: Appointment[];

    @OneToMany(() => Commit, (commit) => commit.user)
    commits: Commit[];
}
