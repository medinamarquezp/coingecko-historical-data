import { EntityRepository, Repository } from 'typeorm';
import { TokensDto } from '../dtos/tokens.dto';
import { Token } from '../entities/token.entity';

@EntityRepository(Token)
export class TokensRepository extends Repository<Token> {
  async findBySupplierId(supplierId: string): Promise<Token> {
    return await this.findOne({
      where: { supplierId: supplierId },
    });
  }

  async setToken(tokenDto: TokensDto): Promise<Token> {
    const token = await this.findBySupplierId(tokenDto.supplierId);
    if (token) {
      return await this.save(this.merge(token, tokenDto));
    }
    return await this.save(this.create(tokenDto));
  }

  async findToken(tokenId: string): Promise<Token> {
    return await this.createQueryBuilder('tokens')
      .where('tokens.supplier_id like :tokenId', { tokenId: `%${tokenId}%` })
      .orWhere('tokens.name like :tokenId', { tokenId: `%${tokenId}%` })
      .orWhere('tokens.symbol like :tokenId', { tokenId: `%${tokenId}%` })
      .getOne();
  }
}
