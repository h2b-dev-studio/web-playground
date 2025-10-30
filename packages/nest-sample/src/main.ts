import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const port = process.env.PORT || 3002
  await app.listen(port)
  console.log(`NestJS server listening on port ${port}`)
  console.log(`Visit http://localhost:${port}`)
}
bootstrap()
