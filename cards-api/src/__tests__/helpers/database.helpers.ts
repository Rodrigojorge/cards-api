import {DbDataSource} from '../../datasources';
import {CardRepository, DeckRepository} from '../../repositories';

const ds = new DbDataSource();

export async function givenEmptyDatabase() {

  await new DeckRepository(ds).deleteAll();
  await new CardRepository(ds).deleteAll();
}

