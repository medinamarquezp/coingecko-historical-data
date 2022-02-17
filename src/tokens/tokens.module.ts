import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokensService } from './services/tokens.service';
import { TokensRepository } from './repositories/tokens.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TokensRepository])],
  providers: [TokensService],
})
export class TokensModule {}
