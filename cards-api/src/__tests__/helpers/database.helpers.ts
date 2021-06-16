import {DbDataSource} from '../../datasources';
import {DeckRepository} from '../../repositories';

const ds = new DbDataSource();

export async function givenEmptyDatabase() {

  await new DeckRepository(ds).deleteAll();

}

export function getDs() {
  return ds;
};

