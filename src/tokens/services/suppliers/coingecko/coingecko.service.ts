import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { HttpService } from 'nestjs-http-promise';
import { coingeckoConfig } from 'src/config/coingecko.config';
import { CoinData } from 'src/tokens/interfaces/suppliers/coingecko/coin-data.interface';
import { CoinMarket } from 'src/tokens/interfaces/suppliers/coingecko/coin-market.interface';

@Injectable()
export class CoinGeckoService {
  constructor(private readonly httpService: HttpService) {}

  async getTokenData(coinId: string): Promise<CoinData> {
    const response = await this.httpService.get(
      coingeckoConfig.coinDataPath(coinId),
    );
    if (response.status === HttpStatus.NOT_FOUND) throw new NotFoundException();
    return response.data;
  }

  async getTopMarket(page: number, perPage: number): Promise<CoinMarket[]> {
    const response = await this.httpService.get(
      coingeckoConfig.coinMarketPath(page, perPage),
    );
    return response.data;
  }

  async geTotalActiveTokens(): Promise<number> {
    const response = await this.httpService.get(coingeckoConfig.global());
    return response.data.data.active_cryptocurrencies;
  }
}
