import { Column, Entity, OneToMany, PrimaryGeneratedColumn,} from "typeorm";
import { User } from "src/modules/users/entities/user.entity";

@Entity("roles")
export class Role{

    @PrimaryGeneratedColumn('increment')
    id:number

    @Column()
    name:string

    @OneToMany(() => User,User =>User.role)
    Users: User[];
}
