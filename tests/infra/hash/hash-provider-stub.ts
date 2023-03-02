import { HashProvider } from "@/infra/crypto/interfaces";

export class HasherProviderStub implements HashProvider {
  async hash(value: string): Promise<string> {
    return await Promise.resolve('hashed-password')
  }
}