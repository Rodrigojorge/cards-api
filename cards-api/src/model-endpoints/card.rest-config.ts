import {ModelCrudRestApiConfig} from '@loopback/rest-crud';
import {Card} from '../models';

const config: ModelCrudRestApiConfig = {
  model: Card,
  pattern: 'CrudRest',
  dataSource: 'testDS',
  basePath: '/cards',
};
module.exports = config;