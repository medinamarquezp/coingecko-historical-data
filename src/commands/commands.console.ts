import { Console, Command } from 'nestjs-console';

@Console()
export class CommandsConsole {
  @Command({
    command: 'seed:token <tokenId>',
    description: 'Seed token data by token ID',
  })
  async seedTokenByID(tokenId: string): Promise<void> {
    console.log(`Seeding token by ID ${tokenId}...`);
  }
}
