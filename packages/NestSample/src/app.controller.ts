import { Controller, Get, Param } from '@nestjs/common'
import { AppService } from './app.service'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getRoot() {
    return {
      message: 'Welcome to NestJS Sample!',
      endpoints: {
        health: '/health',
        hello: '/hello/:name'
      }
    }
  }

  @Get('health')
  getHealth() {
    return { status: 'ok', timestamp: new Date().toISOString() }
  }

  @Get('hello/:name')
  getHello(@Param('name') name: string) {
    return this.appService.getHello(name)
  }
}
