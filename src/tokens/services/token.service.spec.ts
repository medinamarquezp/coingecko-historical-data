import { Test, TestingModule } from '@nestjs/testing';
import {
  bitoinCoinDataRS,
  top5MarketCapRS,
} from 'test/mocks/coingecko/coingecko-api.responses';
import { TokensService } from './tokens.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Token } from '../entities/token.entity';
import { typeormConfig } from 'src/config/typeorm.config';
import { TokensRepository } from '../repositories/tokens.repository';
import { CoinGeckoService } from './suppliers/coingecko/coingecko.service';

describe('Token service test', () => {
  let app: TestingModule;
  let tokensService: TokensService;

  const mockCoinGeckoService = {
    getTokenData: jest.fn((coinId) =>
      bitoinCoinDataRS.find((token) => token.id === coinId),
    ),
    getTopMarket: jest.fn(() => top5MarketCapRS),
  };

  beforeAll(async () => {
    app = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(typeormConfig),
        TypeOrmModule.forFeature([TokensRepository]),
      ],
      providers: [
        TokensService,
        {
          provide: CoinGeckoService,
          useValue: mockCoinGeckoService,
        },
      ],
    }).compile();

    tokensService = app.get<TokensService>(TokensService);
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be defined', () => {
    expect(tokensService).toBeDefined();
  });

  it('should set a token by ID', async () => {
    const token = await tokensService.setToken('bitcoin');
    expect(mockCoinGeckoService.getTokenData).toHaveBeenCalledWith('bitcoin');
    expect(token).toBeInstanceOf(Token);
    expect(token.name).toBe('Bitcoin');
    expect(token.genesysDate).toBe('2009-01-03');
  });

  it('should set a top 5 tokens by market cap', async () => {
    const tokens = await tokensService.setTopMarket(5);
    expect(mockCoinGeckoService.getTopMarket).toHaveBeenCalled();
    expect(tokens.length).toBe(5);
    expect(tokens[0].name).toBe('Bitcoin');
    expect(tokens[2].name).toBe('Tether');
    expect(tokens[4].name).toBe('USD Coin');
  });
});
