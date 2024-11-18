import { Seeder } from "typeorm-extension";
import { DataSource } from "typeorm";
import { Commit } from "src/modules/commits/entities/commit.entity";
import { User } from "src/modules/users/entities/user.entity";
import { Appointment } from "src/modules/appointments/entities/appointment.entity";

export default class CreateCommits implements Seeder{
    public async run(dataSource: DataSource): Promise<void>{
        const commitRepository = dataSource.getRepository(Commit);
        const userRepository = dataSource.getRepository(User);

        const commitsData = [
            {
                content: 'Cita para terapia 1',
                createAt: new Date(),
                Appointment: 3,
                userId:7
            },
            {
                content: 'Cita para terapia 2',
                createAt: new Date(),
                Appointment: 3,
                userId:7
            },
            {
                content: 'Cita para terapia 3',
                createAt: new Date(),
                Appointment: 3,
                userId:7
            },
            {
                content: 'Lectura de examenes de orina',
                createAt: new Date(),
                Appointment: 6,
                userId:7
            },
        ]

        for (let i = 1; i <= commitsData.length; i++) {
            const commit = commitsData[i - 1];
        
            const user = await userRepository.findOne({ where: { id: commit.userId } });
            const appointment = await dataSource.getRepository(Appointment).findOne({ where: { id: commit.Appointment } });
        
            if (!user || !appointment) {
                console.error(`No se encontró la entidad relacionada para commit: ${JSON.stringify(commit)}`);
                continue; 
            }
        
            const commitExist = await commitRepository.findOneBy({ id: i });
        
            if (!commitExist) {
                const newCommit = commitRepository.create({
                    content: commit.content,
                    createdAt: commit.createAt,
                    appointment: appointment, 
                    user: user
                });
                await commitRepository.save(newCommit);
            }
        }
        console.log('Seed Commits loaded');
    }
}