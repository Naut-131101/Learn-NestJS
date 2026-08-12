import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductView } from './product.types';

@Injectable()
export class ProductsService {
  private nextId = 3;

  private readonly products: ProductView[] = [
    { id: 1, name: 'Keyboard', price: 49.9 },
    { id: 2, name: 'Mouse', price: 19.9 },
  ];

  ping(): { service: string; status: string } {
    return {
      service: 'product-service',
      status: 'ok',
    };
  }

  create(dto: CreateProductDto): ProductView {
    const product: ProductView = {
      id: this.nextId++,
      name: dto.name.trim(),
      price: dto.price,
    };

    this.products.push(product);
    return product;
  }

  findAll(): ProductView[] {
    return this.products;
  }

  findOne(id: number): ProductView {
    const product = this.products.find((item) => item.id === id);

    if (!product) {
      throw new RpcException(`Product ${id} không tồn tại`);
    }

    return product;
  }
}
