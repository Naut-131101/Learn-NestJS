import { Entity, type Relation } from 'typeorm';

import { User } from '../../users/entities/user.entity';

@Entity()
export class Photo {
  declare id: number;

  declare url: string;

  declare user: Relation<User>;
}
