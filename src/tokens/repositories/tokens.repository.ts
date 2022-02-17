import { EntityRepository, Repository } from 'typeorm';
import { Tokens } from '../entities/tokens.entity';

@EntityRepository(Tokens)
export class TokensRepository extends Repository<Tokens> {}
