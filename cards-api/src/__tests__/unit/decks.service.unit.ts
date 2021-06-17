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

  it('it should create a deck of a specific number of cards', async () => {
    const id = uuid();
    await deckService.createNewDeck(id, false, 30);
    expect((await deckService.openDeck(id)).cards?.length).to.be.eql(30);
  });

  it('it should create a shuffled a deck', async () => {
    const id = uuid();
    await deckService.createNewDeck(id, true);
  });

  it('it should not open cards from an invalid deck', async () => {
    const id = "invalid";
    await expect(deckService.openDeck(id)).to.be.rejectedWith('Entity not found: Deck with id "invalid"');
  });

  it('it should draw a card', async () => {
    const id = uuid();
    await deckService.createNewDeck(id, false);
    expect((await deckService.drawCard(id)).length).to.be.eql(1);
  });

  it('it should draw an exact number of cards', async () => {
    const id = uuid();
    await deckService.createNewDeck(id, false);
    expect((await deckService.drawCard(id, 7)).length).to.be.eql(7);
  });

  it('it should not draw more than the remaining cards', async () => {
    const id = uuid();
    await deckService.createNewDeck(id, false, 6);
    await expect(deckService.drawCard(id, 7)).to.be.rejectedWith('Not enough cards');
  });

  it('it should not draw cards from an invalid deck', async () => {
    const id = "invalid";
    await expect(deckService.drawCard(id)).to.be.rejectedWith('Entity not found: Deck with id "invalid"');
  });

});
