import { Test, TestingModule } from '@nestjs/testing';
import { usersController } from './users.controller';
import { usersService } from './users.service';

describe('usersController', () => {
  let controller: usersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [usersController],
      providers: [usersService],
    }).compile();

    controller = module.get<usersController>(usersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
