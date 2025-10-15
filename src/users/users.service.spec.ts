import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(() => {
    service = new UsersService();
  });

  it('should return all users', () => {
    expect(service.findAll().length).toBeGreaterThan(0);
  });

  it('should create a new user', () => {
    const user = service.create({
      name: 'Test',
      email: 'test@gmail.com',
      password: '123',
    });
    expect(user).toHaveProperty('id');
  });
});
