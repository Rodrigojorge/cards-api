import {expect} from '@loopback/testlab';
import {v4 as uuid} from 'uuid';
import {DeckRepository} from '../../repositories';
import {DeckService} from '../../services';
import {getDs, givenEmptyDatabase} from '../helpers/database.helpers';

describe('DeckService (unit)', () => {

  before(givenEmptyDatabase);

  const ds = getDs();

  const deckService = new DeckService(new DeckRepository(ds));

  it('it should create a deck', async () => {

    const id = uuid();
    const deck = await deckService.createNewDeck(id, false);
    expect(deck.deckId).to.be.eql(id);

  });

  it('it should create a deck of 52 cards', async () => {
    const id = uuid();
    await deckService.createNewDeck(id, false);
    expect((await deckService.openDeck(id)).cards?.length).to.be.eql(52);

  });

  /*it('it should not open cards from an invalid deck', async () => {
    expect("1").to.be.eql(2);
  });

  it('it should draw a card', async () => {
    expect("1").to.be.eql(2);
  });

  it('it should draw an exact number of cards', async () => {
    expect("1").to.be.eql(2);
  });

  it('it should not draw more than the remaining cards', async () => {
    expect("1").to.be.eql(2);
  });




  it('it should not draw cards from an invalid deck', async () => {
    expect("1").to.be.eql(2);
  });

  it('it should shuffle a deck', async () => {
    expect("1").to.be.eql(2);
  }); */

});
