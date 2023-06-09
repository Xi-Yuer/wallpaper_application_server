import { Module } from '@nestjs/common'
import { FavorService } from './favor.service'
import { FavorController } from './favor.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Favor } from './entities/favor.entity'
import { JwtService } from '@nestjs/jwt'

@Module({
  imports: [TypeOrmModule.forFeature([Favor])],
  controllers: [FavorController],
  providers: [FavorService, JwtService],
})
export class FavorModule {}
