// import { Seeder } from 'typeorm-extension';
// import { DataSource } from 'typeorm';
// import { Tournament } from 'src/tournaments/entities/tournament.entity';
// import { statusTournament } from 'src/common/enums/tournament.enum';

// export default class CreateTorunaments implements Seeder {
//   public async run(dataSource: DataSource): Promise<void> {
//     const tournametRepository = dataSource.getRepository(Tournament);

//     const tournamentsData = [
//       { name: 'FIFA-025', category: "Sport", startDate: "2024-12-01", endDate: "2024-12-01", status:statusTournament.POSTPOSNED},
//       { name: 'FORZA-443', category: "Races", startDate: "2025-01-01", endDate: "2025-02-28", status:statusTournament.ONHOLD},
//       { name: 'STREET FIGHTER-342', category: "Fight", startDate: "2023-11-01", endDate: "2023-12-15", status:statusTournament.CANCELLED},
//     ];

//     for (const tournamet of tournamentsData) {
//       const tournametExist = await tournametRepository.findOneBy({ name: tournamet.name });
//       if (!tournametExist) {
//         const newTournamet = await tournametRepository.create(tournamet);
//         await tournametRepository.save(newTournamet);
//       }
//     }
//     console.log('Tournamets loaded');
//   }
// }