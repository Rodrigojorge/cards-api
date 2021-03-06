import { /* inject, */ BindingScope, injectable } from '@loopback/core';
import { repository } from '@loopback/repository';
import { BusinessException } from '../exception/business-exception';
import { Card, Deck } from '../models';
import { DeckRepository } from '../repositories';
import { v4 as uuid } from 'uuid';

const DECK_ID_REQUIRED = "deckId is required";

const NOT_ENOUGH_CARDS = 'Not enough cards';

@injectable({ scope: BindingScope.SINGLETON })
export class DeckService {

  constructor(@repository(DeckRepository)
  public deckRepository: DeckRepository) { }

  /**
   *
   * Creates a standard 52-card deck of French playing cards,
   * it includes all thirteen ranks in each of the four suits:
   *  spades (),
   *  clubs (),
   *  diamonds (),
   *  and hearts ().
   *  There is no Joker cards.
   *  It allows the following options to the request:
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

    if (deckId == null) {
      deckId = uuid();
    }
    deck.deckId = deckId;
    deck.shuffled = shuffled;
    deck.remaining = remaining;
    deck.cards = [];

    this.addCards(deck);

    if (shuffled) {
      this.shuffleDeck(deck);
    }

    //cut the deck to the remaining desired size
    deck.cards = deck.cards.slice(0, deck.remaining);

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
  private shuffleDeck(deck: Deck) {
    const shuffledCards = deck.cards?.sort(() => Math.random() - 0.5);
    deck.cards = shuffledCards;
  }

  /**
   * Returns a given deck by its UUID.
   *
   * If the deck was not passed over or is invalid it should return an error.
   *
   * This method will ???open the deck???,
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

    if (deckId == null) {
      throw new BusinessException(DECK_ID_REQUIRED)
    }

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

    if (deckId == null) {
      throw new BusinessException(DECK_ID_REQUIRED)
    }

    const deck = await this.deckRepository.findById(deckId);

    if (count > deck.remaining) {
      throw new BusinessException(NOT_ENOUGH_CARDS);
    }

    let i = 1;
    while (i <= count) {
      const card = deck.cards?.shift();
      if (card != null)
        cardsDrawn.push(card);

      deck.remaining -= 1;

      i++;
    }

    await this.deckRepository.update(deck);

    return cardsDrawn;
  }




}
