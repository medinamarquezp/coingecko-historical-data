import * as prettyMilliseconds from 'pretty-ms';
import { Console, Command, createSpinner } from 'nestjs-console';
import { sleep } from 'src/utils/sleep';
import { TokensService } from 'src/tokens/services/tokens.service';

@Console()
export class CommandsConsole {
  MAX_REQUEST_MIN = 50;
  MIN_MILISECONDS = 60000;

  constructor(private readonly tokensService: TokensService) {}

  @Command({
    command: 'seed:token <tokenId>',
    description: 'Seed token data by token ID',
  })
  async seedTokenByID(tokenId: string): Promise<void> {
    const initTimer = Date.now();
    const spinner = createSpinner();
    try {
      spinner.info(`Seeding process started`);
      spinner.info('Looking for token info on local storage');
      const token = await this.tokensService.findToken(tokenId);
      if (token) {
        const { supplierId } = token;
        spinner.info(`Seeding data of token "${supplierId}"`);
        await this.tokensService.setToken(supplierId);
      } else {
        spinner.warn('No token info was found on local storage');
        spinner.info(`Trying seeding data by using ID "${tokenId}"`);
        await this.tokensService.setToken(tokenId);
      }
      const totalTime = prettyMilliseconds(Date.now() - initTimer);
      spinner.succeed(`Seeding process finished successfully in ${totalTime}`);
      spinner.stop();
    } catch (error) {
      spinner.fail(`Seeding procees fails: No token found by ID "${tokenId}"`);
      spinner.stop();
    }
  }

  @Command({
    command: 'seed:top <top>',
    description: 'Seed tokens by top market cap',
  })
  async seedTokensByTop(top: number): Promise<void> {
    const initTimer = Date.now();
    const spinner = createSpinner();
    try {
      spinner.info(`Seeding process started`);
      spinner.info('Getting total active tokens');
      const totalTokens = await this.tokensService.getTotalActiveTokens();

      if (top <= 0 || top > totalTokens) {
        throw new Error('Top parameter is out of bounds');
      }

      let page = 1;
      const perPage = 50;
      const numPages = Math.ceil(top / this.MAX_REQUEST_MIN);
      if (numPages > 1) {
        spinner.warn(`Seeding process will take about ${numPages} minutes...`);
      }

      // TODO:
      // Coingecko free API has a limitation of 50 RQs in a minute.
      // Temporarily we will processing in batch of 50 RQs doing pauses every minute.
      // It will be necessary to move this logic to a queue in order to process it in background.
      // In addition, it would only be necessary to download those tokens that do not exist
      // or whose date of last update is greater than a week.
      while (page <= numPages) {
        spinner.start(`Processing iteration ${page}`);
        await this.tokensService.setTopMarket(page, perPage);
        spinner.stop();
        spinner.succeed(`Iteration ${page} processed successfully`);
        spinner.start(
          `Iteration ${page} of ${numPages}. Next iteration will be processed in ${prettyMilliseconds(
            this.MIN_MILISECONDS,
          )}, be patient...`,
        );
        if (page === numPages) break;
        await sleep(this.MIN_MILISECONDS);
        spinner.stop();
        page += 1;
      }

      const totalTime = prettyMilliseconds(Date.now() - initTimer);
      spinner.succeed(`Seeding process finished successfully in ${totalTime}`);
      spinner.stop();
    } catch (error) {
      spinner.fail(`Seeding procees fails: "${error.message}"`);
      spinner.stop();
    }
  }
}
