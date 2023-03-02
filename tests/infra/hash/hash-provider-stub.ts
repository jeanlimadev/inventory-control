/* eslint-disable @typescript-eslint/no-unused-vars */
import { HashProvider } from '@/domain/contracts/gateways';

export class HasherProviderStub implements HashProvider {
  async hash(value: string): Promise<string> {
    return await Promise.resolve('hashed-password');
  }
}
