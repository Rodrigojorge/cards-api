import {Client, expect} from '@loopback/testlab';
import {CardsApiApplication} from '../..';
import {setupApplication} from './test-helper';

describe('CardController', () => {
  let app: CardsApiApplication;
  let client: Client;

  before('setupApplication', async () => {
    ({app, client} = await setupApplication());
  });

  after(async () => {
    await app.stop();
  });

  it('invokes GET /cards - must contain 52 cards', async () => {
    const res = await client.get('/cards').expect(200);

    expect(res.body).to.have.length(52);

    //expect(res.body).to.containEql({ code: 'AS', value: 'ACE', suit: 'SPADES' });
  });
});
