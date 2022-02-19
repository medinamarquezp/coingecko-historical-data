import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TokenDto } from '../dtos/token.dto';
import { Token } from '../entities/token.entity';
import { TokenRepository } from '../repositories/token.repository';
import { CoinGeckoService } from './suppliers/coingecko/coingecko.service';

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(TokenRepository)
    private readonly tokensRepository: TokenRepository,
    private readonly coingeckoService: CoinGeckoService,
  ) {}

  async setToken(tokenId: string): Promise<Token> {
    const data = await this.coingeckoService.getTokenData(tokenId);
    const tokenDto = TokenDto.setFromCoinData(data);
    return await this.tokensRepository.setToken(tokenDto);
  }

  async setTopMarket(top: number): Promise<Token[]> {
    const tokens: Token[] = [];
    const data = await this.coingeckoService.getTopMarket(top);
    for await (const token of data) {
      const savedToken = await this.setToken(token.id);
      tokens.push(savedToken);
    }
    return tokens;
  }
}
