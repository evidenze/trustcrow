import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<any> {
    const category: Category = await this.categoryRepo.save(createCategoryDto);
    if (category) {
      return {
        status: true,
        message: 'Category added successfully',
        data: category,
      };
    }
  }

  async findOne(id: number) {
    const category: Category = await this.categoryRepo.findOne({
      where: { id },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return {
      status: true,
      data: category,
    };
  }

  async remove(id: number) {
    const category: DeleteResult = await this.categoryRepo.delete({ id });
    if (category.affected == 1) {
      return {
        status: true,
        message: 'Category deleted successfully',
      };
    }
  }
}
