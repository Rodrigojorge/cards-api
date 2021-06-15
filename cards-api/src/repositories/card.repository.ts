import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {TestDsDataSource} from '../datasources';
import {Card, CardRelations} from '../models';

export class CardRepository extends DefaultCrudRepository<
  Card,
  typeof Card.prototype.code,
  CardRelations
> {
  constructor(
    @inject('datasources.testDS') dataSource: TestDsDataSource,
  ) {
    super(Card, dataSource);
  }
}
