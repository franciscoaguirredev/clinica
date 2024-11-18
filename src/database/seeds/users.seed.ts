import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { User } from 'src/modules/users/entities/user.entity';

export default class CreateUsers implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const userRepository = dataSource.getRepository(User);

    const usersData = [
      {
        name: 'Alberto Acosta',
        email: 'alberto@correo.com',
        password: 'Qwer1234*',
        role: 1,
      },
      {
        name: 'Bibiana Bermudez',
        email: 'bibiana@correo.com',
        password: 'Qwer1234*',
        role: 1,
      },
      {
        name: 'Carlos Castro',
        email: 'carlos@correo.com',
        password: 'Qwer1234*',
        role: 1,
      },
      {
        name: 'Daniel Díaz',
        email: 'daniel@correo.com',
        password: 'Qwer1234*',
        role: 2,
      },
      {
        name: 'Erika Echeverri',
        email: 'erika@correo.com',
        password: 'Qwer1234*',
        role: 2,
      },
      {
        name: 'Fernando Franco',
        email: 'fernando@correo.com',
        password: 'Qwer1234*',
        role: 2,
      },      
      {
        name: 'Gisela Gomez',
        email: 'gisela@correo.com',
        password: 'Qwer1234*',
        role: 3,
      },
      {
        name: 'sistemas',
        email: 'sistemas@correo.com',
        password: 'Qwer1234*',
        role: 4,
      },
    ];

    for (const user of usersData) {
      const userExist = await userRepository.findOneBy({ email: user.email });
      if (!userExist) {
        const newUser = userRepository.create(user);
        await userRepository.save(newUser);
      }
    }
    console.log('Seed Users loaded');
  }
}
