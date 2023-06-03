import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import * as cors from 'cors'
import { NestExpressApplication } from '@nestjs/platform-express'
import rateLimit from 'express-rate-limit'
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
  app.use(cors())
  app.useGlobalInterceptors(new ResponseInterceptor())
  app.setGlobalPrefix('/api/v1')
  app.use(
    rateLimit({
      windowMs: 1 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    }),
  )
  app.set('trust proxy', 1);
  await app.listen(10086)
}

bootstrap()
