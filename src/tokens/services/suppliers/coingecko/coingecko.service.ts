import { Injectable } from '@nestjs/common';
import { HttpService } from 'nestjs-http-promise';
import { coingeckoConfig } from 'src/config/coingecko.config';
import { CoinData } from 'src/tokens/interfaces/suppliers/coingecko/coin-data.interface';

@Injectable()
export class CoinGeckoService {
  constructor(private readonly httpService: HttpService) {}

  async getTokenData(coinId: string): Promise<CoinData> {
    const response = await this.httpService.get(
      coingeckoConfig.coinDataPath(coinId),
    );
    return response.data;
  }

  async getTopMarket(top: number): Promise<CoinData> {
    const response = await this.httpService.get(
      coingeckoConfig.coinMarketPath(top),
    );
    return response.data;
  }
}
