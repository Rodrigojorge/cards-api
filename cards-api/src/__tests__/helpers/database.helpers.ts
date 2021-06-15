import {DbDataSource} from '../../datasources';
import {CardRepository, DeckRepository} from '../../repositories';

export async function givenEmptyDatabase() {
  const ds = new DbDataSource();

  await new DeckRepository(ds).deleteAll();
  await new CardRepository(ds).deleteAll();
}
