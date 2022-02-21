import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TokensDto } from '../dtos/tokens.dto';
import { Token } from '../entities/token.entity';
import { TokensRepository } from '../repositories/tokens.repository';
import { CoinGeckoService } from './suppliers/coingecko/coingecko.service';

@Injectable()
export class TokensService {
  constructor(
    @InjectRepository(TokensRepository)
    private readonly tokensRepository: TokensRepository,
    private readonly coingeckoService: CoinGeckoService,
  ) {}

  async setToken(tokenId: string): Promise<Token> {
    const data = await this.coingeckoService.getTokenData(tokenId);
    const tokenDto = TokensDto.setFromCoinData(data);
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

  async findToken(tokenId: string): Promise<Token> {
    const token = await this.tokensRepository.findToken(tokenId);
    return !!token ? token : null;
  }

  async getTotalActiveTokens(): Promise<number> {
    return this.coingeckoService.geTotalActiveTokens();
  }
}
