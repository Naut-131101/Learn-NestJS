import { Module } from '@nestjs/common';
import { PhotoService } from './photo.service';
import { PhotoController } from './photo.controller';
// import { Photo } from './entities/photo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhotoSchema } from '../users/schemas/photo.schema';

@Module({
  imports: [TypeOrmModule.forFeature([PhotoSchema])],
  controllers: [PhotoController],
  providers: [PhotoService],
})
export class PhotoModule {}
