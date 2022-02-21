export const coingeckoConfig = {
  basePath: 'https://api.coingecko.com/api/v3',
  coinDataPath(coinId: string) {
    return `${coingeckoConfig.basePath}/coins/${coinId}?localization=false&tickers=false&market_data=false&community_data=false&developer_data=false`;
  },
  coinMarketPath(
    page = 1,
    perPage = 50,
    currency = 'usd',
    order = 'market_cap_desc',
  ) {
    return `${coingeckoConfig.basePath}/coins/markets?vs_currency=${currency}&per_page=${perPage}&page=${page}&order=${order}`;
  },
  global() {
    return `${coingeckoConfig.basePath}/global`;
  },
};
