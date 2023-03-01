import { ProductBuilder } from "#/builders/models/product";
import { InMemoryProductsRepository } from "#/infra/repositories";
import { ProductModel } from "@/models";
import { CreateProductUseCase } from "@/usecases/products"


interface Subject {
  productsRepository: InMemoryProductsRepository;
  sut: CreateProductUseCase;
}

const createSubject = (products: ProductModel[] = []): Subject => {
  const productsRepository = new InMemoryProductsRepository(products);
  const sut = new CreateProductUseCase(productsRepository);

  productsRepository.create = jest.fn();

  return {
    productsRepository,
    sut
  }
}

describe('CreateProductUseCase', () => {
  it('should be able to create a product', async () => {
    const { productsRepository, sut } = createSubject();
    const product = new ProductBuilder().build();

    await sut.execute(product);

    expect(productsRepository.create).toHaveBeenNthCalledWith(1, product);
  })

  it('should not be able to create a product', async () => {
    const product = new ProductBuilder().build();
    const { productsRepository, sut } = createSubject([product]);

    await expect(sut.execute(product)).rejects.toThrow();

    expect(productsRepository.create).not.toHaveBeenCalled();
  })
})