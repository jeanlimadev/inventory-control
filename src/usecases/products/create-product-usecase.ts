import { CreateProduct, FindProductByName } from "@/infra/db/repositories/interfaces";
import { ProductModel } from "@/domain/models";


export class CreateProductUseCase {
  constructor(private readonly usersRepository: CreateProduct & FindProductByName) {}
  
  async execute (product: ProductModel): Promise<void> {
    const productExists = await this.usersRepository.findByName(product.name);

    if (productExists) throw new Error('User already exists!');

    await this.usersRepository.create(product);
  }
}