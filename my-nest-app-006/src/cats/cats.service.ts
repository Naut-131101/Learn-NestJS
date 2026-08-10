import { Injectable, NotFoundException } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose/dist/common/mongoose.decorators';
import { Cat } from './entities/cat.entity';
import { CatDocument } from './schemas/cat.schema';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';

@Injectable()
export class CatsService {
  constructor(@InjectModel(Cat.name) private readonly catModel: Model<Cat>) {}

  async create(createCatDto: CreateCatDto): Promise<CatDocument> {
    const createdCat = new this.catModel(createCatDto);
    return createdCat.save();
  }

  async findAll(): Promise<CatDocument[]> {
    return this.catModel.find().exec();
  }

  async findOne(id: Types.ObjectId): Promise<CatDocument> {
    const cat = await this.catModel.findById(id).exec();

    if (!cat) {
      throw new NotFoundException(`Cat with id ${id.toString()} not found`);
    }

    return cat;
  }

  async update(
    id: Types.ObjectId,
    updateCatDto: UpdateCatDto,
  ): Promise<CatDocument> {
    const updatedCat = await this.catModel
      .findByIdAndUpdate(id, updateCatDto, {
        new: true,
        runValidators: true,
      })
      .exec();

    if (!updatedCat) {
      throw new NotFoundException(`Cat with id ${id.toString()} not found`);
    }

    return updatedCat;
  }

  async remove(id: Types.ObjectId): Promise<CatDocument> {
    const deletedCat = await this.catModel.findByIdAndDelete(id).exec();

    if (!deletedCat) {
      throw new NotFoundException(`Cat with id ${id.toString()} not found`);
    }

    return deletedCat;
  }
}
