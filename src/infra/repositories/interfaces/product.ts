import { ProductModel } from "@/models";


export interface CreateProduct {
  create: (product: ProductModel) => Promise<void>;
}

export interface FindProductByName {
  findByName: (name: string) => Promise<ProductModel | undefined>;
}