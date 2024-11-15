import { Module, OnModuleInit} from "@nestjs/common";
import { DatabaseConfigService } from "./common/config/connection-db.config";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConfigService,
    }),
  ],
  providers: [DatabaseConfigService],
  exports: [DatabaseConfigService],
})

export class DatabaseModule{}
