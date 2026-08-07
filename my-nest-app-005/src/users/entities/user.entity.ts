// import { Relation } from 'typeorm';

// import { Photo } from '../../photo/entities/photo.entity';

// export class User {
//   declare id: number;
//   declare firstName: string;
//   declare lastName: string;
//   declare isActive: boolean;
//   declare photos: Relation<Photo>[];
// }

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  declare id: number;

  @Column({ type: 'varchar', length: 255 })
  declare firstName: string;

  @Column({ type: 'varchar', length: 255 })
  declare lastName: string;

  @Column({ type: 'boolean' })
  declare isActive: boolean;

  // @OneToMany(() => Photo, (photo) => photo.user)
  // declare photos: Relation<Photo>[];
}
