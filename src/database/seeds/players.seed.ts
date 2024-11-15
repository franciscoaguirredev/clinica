// import { Seeder } from 'typeorm-extension';
// import { DataSource } from 'typeorm';
// import { Player } from 'src/players/entities/player.entity';
// import * as bcrypt from 'bcrypt';

// export default class CreatePlayers implements Seeder {
//   public async run(dataSource: DataSource): Promise<void> {
//     const playerRepository = dataSource.getRepository(Player);

//     const playersData = [
//       { name: 'Hugo', email: "hugo@gmail.com", password: "Qwer1234*" },
//       { name: 'Paco', email: "paco@gmail.com", password: "Qwer1234*" },
//       { name: 'Luis', email: "luis@gmail.com", password: "Qwer1234*" },
//     ];

//     for (const player of playersData) {
//       const playerExist = await playerRepository.findOneBy({ email: player.email });
//       if (!playerExist) {
//         const { password, ...restPlayerData } = player;
//         const newPlayer = await playerRepository.create({
//           ...restPlayerData,
//           password: bcrypt.hashSync(password, 10),
//         });
//         await playerRepository.save(newPlayer);
//       }
//     }
//     console.log('Players loaded');
//   }
// }