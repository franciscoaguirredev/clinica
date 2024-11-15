import { Module, OnModuleInit} from "@nestjs/common";
import { DatabaseConfigService } from "./common/config/connection-db.config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SeedModule } from "./database/seeds/seed.module";
import { SeedService } from "./database/seeds/seed.service";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConfigService,
    }),
    SeedModule
  ],
  providers: [DatabaseConfigService],
  exports: [DatabaseConfigService],
})

// export class DatabaseModule{}
export class DatabaseModule implements OnModuleInit{
    constructor(private readonly seedService: SeedService) {}

  async onModuleInit() {
    await this.seedService.seed();
  }
}
