import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TokensRepository } from '../repositories/tokens.repository';

@Injectable()
export class TokensService {
  constructor(
    @InjectRepository(TokensRepository)
    private readonly tokensRepository: TokensRepository,
  ) {}
}
