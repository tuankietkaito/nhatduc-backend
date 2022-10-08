import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { NewProductDto } from '../utils/dto';
import { Product } from './product.model';

@Injectable()
export class ProductsService {
  constructor(@InjectModel('Product') private readonly productModel: Model<Product>) {}

  async createNewProduct(product: NewProductDto) {
    const newProduct = new this.productModel(product);
    const result = (await newProduct.save()) as Product;
    return result;
  }

  async updateOne(productId: string, updateData: any = {}) {
    const updatedProduct = await this.productModel.findOneAndUpdate({ _id: productId }, updateData, {
      new: true
    });
    return updatedProduct;
  }

  async deleteOne(filter: any = {}) {
    const deletedProduct = await this.productModel.findOneAndDelete(filter);
    return deletedProduct;
  }

  async findById(id: Types.ObjectId) {
    const product: Product = await this.productModel.findById(id);
    if (!product) throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    return product;
  }

  async findOne(query: any = {}) {
    const product: Product = await this.productModel.findOne(query);
    return product;
  }

  async find(query: any = {}) {
    const products: Product[] = await this.productModel.find(query);
    return products;
  }
}
