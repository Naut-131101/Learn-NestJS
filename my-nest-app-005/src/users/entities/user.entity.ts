import { Relation } from 'typeorm';

import { Photo } from '../../photo/entities/photo.entity';

export class User {
  declare id: number;
  declare firstName: string;
  declare lastName: string;
  declare isActive: boolean;
  declare photos: Relation<Photo>[];
}
