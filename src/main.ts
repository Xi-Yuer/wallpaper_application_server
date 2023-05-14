import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { AppModule } from './app.module'
import { ResponseInterceptor } from './interceptor/global.response.interceptor'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  // 全局管道，用户校验用户输入
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  )
  app.useGlobalInterceptors(new ResponseInterceptor())
  app.setGlobalPrefix('/api/v1')
  await app.listen(10086)
}

bootstrap()
