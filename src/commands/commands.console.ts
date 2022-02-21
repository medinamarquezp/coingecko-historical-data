import * as prettyMilliseconds from 'pretty-ms';
import { Console, Command, createSpinner } from 'nestjs-console';
import { TokensService } from 'src/tokens/services/tokens.service';

@Console()
export class CommandsConsole {
  constructor(private readonly tokensService: TokensService) {}

  @Command({
    command: 'seed:token <tokenId>',
    description: 'Seed token data by token ID',
  })
  async seedTokenByID(tokenId: string): Promise<void> {
    const initTimer = Date.now();
    const spinner = createSpinner().start();
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
}
