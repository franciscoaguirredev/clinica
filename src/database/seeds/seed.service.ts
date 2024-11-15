// import { Injectable } from '@nestjs/common';
// import { DataSource } from 'typeorm';
// import CreatePlayers from './players.seed';
// import CreateTorunaments from './tournaments.seed';

// @Injectable()
// export class SeedService {
//   constructor(private readonly dataSource: DataSource) {}

//   async seed(){
//     const playerSeeder = new CreatePlayers()
//     const tournametSeeder = new CreateTorunaments
//     await playerSeeder.run(this.dataSource)
//     await tournametSeeder.run(this.dataSource)
//   }
// }