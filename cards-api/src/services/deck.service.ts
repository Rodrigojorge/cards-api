import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {Card, Deck} from '../models';
import {DeckRepository} from '../repositories';

@injectable({scope: BindingScope.SINGLETON})
export class DeckService {

  constructor(@repository(DeckRepository)
  public deckRepository: DeckRepository) { }

  /**
   *
   * Create a standard 52-card deck of French playing cards,
   * it includes all thirteen ranks in each of the four suits:
   *  spades (),
   *  clubs (),
   *  diamonds (),
   *  and hearts ().
   *  You don’t need to worry about Joker cards for this assignment.
   *  You should allow the following options to the request:
   *      The deck id (UUID)
   *      The deck properties like shuffled (boolean)
   *      and total cards remaining in this deck (integer)
   *
   * {
   *   "deck_id": "521b0293-01f7-44c2-9990-27079eb2352d",
   *   "shuffled": false,
   *   "remaining": 30
   * }
   *
   * @param deckId
   * @param shuffled
   * @param remaining
   */
  async createNewDeck(deckId: string, shuffled: boolean, remaining = 52): Promise<Deck> {

    const deck = new Deck();

    deck.deckId = deckId;
    deck.shuffled = shuffled;
    deck.remaining = remaining;
    deck.cards = [];

    this.addCards(deck);

    await this.deckRepository.create(deck);

    return this.deckRepository.save(deck);
  }

  private addCards(deck: Deck) {
    ["SPADES", "CLUBS", "DIAMONDS", "HEARTS"].forEach((suit) => {
      const suitCode = suit.charAt(0);

      deck.cards?.push(new Card({
        code: "A" + suitCode,
        suit: suit,
        value: "ACE"
      }));

      for (let i = 2; i <= 10; i++) {
        deck.cards?.push(new Card({
          code: i + suitCode,
          suit: suit,
          value: i.toString()
        }));
      }

      deck.cards?.push(new Card({
        code: "J" + suitCode,
        suit: suit,
        value: "JACK"
      }));

      deck.cards?.push(new Card({
        code: "Q" + suitCode,
        suit: suit,
        value: "QUEEN"
      }));

      deck.cards?.push(new Card({
        code: "K" + suitCode,
        suit: suit,
        value: "KING"
      }));


    });
  }


  /**
   * Shuffles a Deck of cards
   *
   * @param deck
   */
  async shuffleDeck(deck: Deck) {
    const shuffledCards = deck.card.sort(() => Math.random() - 0.5);
    deck.cards = shuffledCards;
  }

  /**
   * Return a given deck by its UUID.
   *
   * If the deck was not passed over or is invalid it should return an error.
   *
   * This method will “open the deck”,
   * meaning that it will list all cards by the order it was created.
   * The response needs to return a JSON that would include:
   *    The deck id (UUID)
   *    The deck properties like shuffled (boolean) and total cards remaining
   *      in this deck (integer)
   *    All the remaining cards (card object)
   *
   * @param deckId
   * @returns
   */
  async openDeck(deckId: string): Promise<Deck> {

    return this.deckRepository.findById(deckId);
  }


  /**
  * Draw a card(s) of a given Deck, if the deck was not passed over
  * or invalid it should return an error. A count parameter needs to be
  * provided to define how many cards to draw from the deck.
  * The response needs to return a JSON that would include:
  *    All the drawn cards (card object)
  *
  * @param deckId
  * @param count
  * @returns
  */
  async drawCard(deckId: string, count = 1): Promise<Card[]> {
    const cardsDrawn: Card[] = [];

    const deck = await this.deckRepository.findById(deckId);

    if (count > deck.remaining) {
      throw Error('Not enough cards.');
    }

    let i = 1;
    while (i <= count) {
      const card = deck.cards.shift();
      if (card != null)
        cardsDrawn.push(card);

      deck.remaining -= 1;

      i++;
    }

    await this.deckRepository.update(deck);

    return cardsDrawn;
  }




}
