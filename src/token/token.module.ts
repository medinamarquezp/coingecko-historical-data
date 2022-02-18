import { Module } from '@nestjs/common';
import { HttpModule } from 'nestjs-http-promise';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenService } from './services/token.service';
import { TokenRepository } from './repositories/token.repository';
import { CoinGeckoService } from './services/suppliers/coingecko/coingecko.service';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([TokenRepository])],
  providers: [TokenService, CoinGeckoService],
  exports: [TokenService],
})
export class TokenModule {}
