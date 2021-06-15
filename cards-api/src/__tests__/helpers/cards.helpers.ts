import {DbDataSource} from '../../datasources';
import {Card} from '../../models';
import {CardRepository} from '../../repositories';

const ds = new DbDataSource();

export function givenCardData(data?: Partial<Card>) {
  return Object.assign(
    {
      code: 'AS',
      value: 'ACE',
      suit: 'SPADES'
    },
    data,
  );
}

export async function givenCard(data?: Partial<Card>) {
  return new CardRepository(ds).create(givenCardData(data));
}

