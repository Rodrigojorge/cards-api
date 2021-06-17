import {service} from '@loopback/core';
import {
  get,
  getModelSchemaRef, param, post, requestBody,
  response
} from '@loopback/rest';
import {Card, Deck} from '../models';
import {DeckService} from '../services';

export class DeckController {
  constructor(
    @service(DeckService)
    public deckService: DeckService,
  ) { }

  @post('/decks')
  @response(200, {
    description: 'Create a New Deck',
    content: {'application/json': {schema: getModelSchemaRef(Deck)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Deck, {
            title: 'NewDeck'
          }),
        },
      },
    })
    deck: Deck,
  ): Promise<Deck> {
    return this.deckService.createNewDeck(
      deck.deckId,
      deck.shuffled,
      deck.remaining
    );
  }

  @get('/decks/{id}')
  @response(200, {
    description: 'Open a Deck',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Deck, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string): Promise<Deck> {
    return this.deckService.openDeck(id);
  }

  @get('/decks/{id}/cards')
  @response(200, {
    description: 'Draw a Card(s)',
  })
  async drawCard(
    @param.path.string('id') id: string,
    @param.query.string('count') count: number
  ): Promise<Card[]> {
    return this.deckService.drawCard(id, count);
  }

}
