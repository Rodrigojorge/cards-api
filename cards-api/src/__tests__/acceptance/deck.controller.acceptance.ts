import {Client, expect} from '@loopback/testlab';
import {v4 as uuid} from 'uuid';
import {CardsApiApplication} from '../../application';
import {setupApplication} from './test-helper';

describe('DeckController (acceptance)', () => {
  let app: CardsApiApplication;
  let client: Client;

  before('setupApplication', async () => {
    ({app, client} = await setupApplication());
  });

  after(async () => {
    await app.stop();
  });

  const id = uuid();

  const body = {
    deckId: id,
    shuffled: true,
    remaining: 30
  }

  it('it should create a new deck - invokes POST /decks', async () => {
    const res = await client
      .post('/decks')
      .send(body)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(res.body).to.containEql({
      deckId: id,
      shuffled: true,
      remaining: 30
    });
  });

  it('it should fail with a null id - invokes POST /decks', async () => {
    const bodyIdNull = {
      deckId: null
    }
    const res = await client
      .post('/decks')
      .send(bodyIdNull)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(res).to.be.rejectedWith('deckId is required');
  });


  it('Open a Deck - invokes GET /decks/{id}', async () => {
    const res = await client
      .get(`/decks/${id}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(res.body.cards.length).to.be.eql(30);
  });

  it('Draw a Card - invokes GET /decks/{id}/cards', async () => {
    const res = await client
      .get(`/decks/${id}/cards`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(res.body.length).to.be.eql(1);
  });

  it('Draw 5 Cards - invokes GET /decks/{id}/cards', async () => {
    const res = await client
      .get(`/decks/${id}/cards?count=5`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(res.body.length).to.be.eql(5);
  });
});
