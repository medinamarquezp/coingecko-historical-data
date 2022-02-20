import { Module } from '@nestjs/common';
import { HttpModule } from 'nestjs-http-promise';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokensService } from './services/tokens.service';
import { TokensRepository } from './repositories/tokens.repository';
import { CoinGeckoService } from './services/suppliers/coingecko/coingecko.service';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([TokensRepository])],
  providers: [TokensService, CoinGeckoService],
  exports: [TokensService],
})
export class TokenModule {}
