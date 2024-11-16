import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Role } from 'src/modules/roles/entities/role.entity';

export default class CreateRoles implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const roleRepository = dataSource.getRepository(Role);

    const rolesData = [
      {
        name: 'usuario',
      },
      {
        name: 'doctor',
      },
      {
        name: 'asistente',
      },
      {
        name: 'administrador',
      },
    ];

    for (const role of rolesData) {
      const roleExist = await roleRepository.findOneBy({ name: role.name });
      if (!roleExist) {
        const newRole = roleRepository.create(role);
        await roleRepository.save(newRole);
      }
    }
    console.log('Seed Roles loaded');
  }
}
