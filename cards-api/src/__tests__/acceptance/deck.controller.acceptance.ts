import {Client} from '@loopback/testlab';
import {CardsApiApplication} from '../..';
import {setupApplication} from './test-helper';

describe('DeckController', () => {
  let app: CardsApiApplication;
  let client: Client;

  before('setupApplication', async () => {
    ({app, client} = await setupApplication());
  });

  after(async () => {
    await app.stop();
  });

  it('invokes GET /decks', async () => {
    const res = await client.get('/decks').expect(200);
    //expect(res.body).to.containEql({greeting: 'Hello from LoopBack'});
  });
});
