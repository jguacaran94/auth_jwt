import { Injectable } from '@nestjs/common';

export type User = any

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      username: 'francis',
      password: 'francis123'
    },
    {
      userId: 2,
      username: 'jorge',
      password: 'jorge123'
    }
  ]

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username)
  }
}
