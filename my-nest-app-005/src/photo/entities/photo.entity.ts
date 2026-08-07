// import { Entity, type Relation } from 'typeorm';

// import { User } from '../../users/entities/user.entity';

// @Entity()
// export class Photo {
//   declare id: number;

//   declare url: string;

//   declare user: Relation<User>;
// }

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('photos')
export class Photo {
  @PrimaryGeneratedColumn()
  declare id: number;

  @Column({ type: 'varchar', length: 255 })
  declare url: string;

  // @ManyToOne(() => User, (user) => user.photos)
  // declare user: Relation<User>;
}
