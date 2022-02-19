import { Injectable } from '@nestjs/common';
import { HttpService } from 'nestjs-http-promise';
import { coingeckoConfig } from 'src/config/coingecko.config';
import { CoinData } from 'src/token/interfaces/suppliers/coingecko/coin-data.interface';
import { CoinMarket } from 'src/token/interfaces/suppliers/coingecko/coin-market.interface';

@Injectable()
export class CoinGeckoService {
  constructor(private readonly httpService: HttpService) {}

  async getTokenData(coinId: string): Promise<CoinData> {
    const response = await this.httpService.get(
      coingeckoConfig.coinDataPath(coinId),
    );
    return response.data;
  }

  async getTopMarket(top: number): Promise<CoinMarket[]> {
    const response = await this.httpService.get(
      coingeckoConfig.coinMarketPath(top),
    );
    return response.data;
  }
}
