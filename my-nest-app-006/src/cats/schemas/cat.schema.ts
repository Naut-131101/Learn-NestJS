import { Prop, Schema, SchemaFactory, Virtual } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CatDocument = HydratedDocument<Cat>;

@Schema({ timestamps: true, collection: 'myCatCollection' })
export class Cat {
  @Prop({ required: true, trim: true }) declare name: string;
  @Prop({ required: true, min: 0 }) declare age: number;
  @Prop({ required: true, trim: true }) declare breed: string;

  @Virtual({
    get: function (this: Cat) {
      return `${this.name} - ${this.breed}`;
    },
  })
  declare displayName: string;
}

export const CatSchema = SchemaFactory.createForClass(Cat);
