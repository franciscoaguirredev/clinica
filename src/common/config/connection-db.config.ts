import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { EnvConfig } from "./env.config";
import { Injectable } from "@nestjs/common";
import { Role } from "src/modules/roles/entities/role.entity";
import { User } from "src/modules/users/entities/user.entity";
import { Appointment } from "src/modules/appointments/entities/appointment.entity";
import { Commit } from "src/modules/commits/entities/commit.entity";

@Injectable()
export class DatabaseConfigService implements TypeOrmOptionsFactory {
    createTypeOrmOptions():TypeOrmModuleOptions {
        console.log({ envConfig: EnvConfig() });
        return{
            type:'postgres',
            host: EnvConfig().host,
            port: EnvConfig().port,
            database: EnvConfig().name,
            username: EnvConfig().username,
            password:EnvConfig().password,
            // autoLoadEntities:true,
            entities: [Role, User, Appointment, Commit],
            dropSchema:true,
            synchronize:true
        }
    }
}