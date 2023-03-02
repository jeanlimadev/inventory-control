import { ProductModel } from "@/domain/models";
import { CreateProduct, FindProductByName } from "../db/repositories/interfaces";


export class InMemoryProductsRepository implements CreateProduct, FindProductByName {
  constructor(private readonly products: ProductModel[] = []) {}
  
  async create (product: ProductModel): Promise<void> {};

  async findByName (name: string): Promise<ProductModel | undefined> {
    const product = this.products.find(product => product.name === name)
    return product;
  };
}