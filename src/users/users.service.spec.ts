import { UsersService } from './users.service';
import { HttpException } from '@nestjs/common';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(() => {
    service = new UsersService();
  });

  it('should return all users', () => {
    const users = service.findAll();
    expect(users).toBeDefined();
    expect(users.length).toBeGreaterThan(0);
  });

  it('should return a single user by ID', () => {
    const user = service.findOne(1);
    expect(user).toBeDefined();
    expect(user.name).toBe('Asad');
  });

  it('should throw an error if user not found', () => {
    expect(() => service.findOne(999)).toThrow(HttpException);
  });

  it('should create a new user', () => {
    const dto = { name: 'Ali', email: 'ali@gmail.com', password: 'abcdef' };
    const newUser = service.create(dto);
    expect(newUser).toMatchObject(dto);
    expect(service.findAll().length).toBeGreaterThan(1);
  });
});
