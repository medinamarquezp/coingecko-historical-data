import { CoinData } from '../interfaces/suppliers/coingecko/coin-data.interface';

export class TokensDto {
  supplierId: string;
  name?: string;
  symbol?: string;
  genesysDate?: Date;
  marketCapRank?: number;
  supplierLastUpdate?: Date;

  static setFromCoinData(coinData: CoinData): TokensDto {
    return Object.assign(new this(), {
      supplierId: coinData.id,
      name: coinData.name,
      symbol: coinData.symbol,
      genesysDate: coinData.genesis_date,
      marketCapRank: coinData.market_cap_rank,
      supplierLastUpdate: coinData.last_updated,
    });
  }
}
