import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
  getHello(name: string): { message: string } {
    return { message: `Hello, ${name}!` }
  }
}
