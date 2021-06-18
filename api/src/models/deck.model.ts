import { Entity, model, property } from '@loopback/repository';
import { Card } from '.';

@model({ settings: { strict: false } })
export class Deck extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    name: 'deck_id',

  })
  deckId: string;

  @property({
    type: 'boolean',
    required: true,
  })
  shuffled: boolean;

  @property({
    type: 'number',
    required: true,
    jsonSchema: {
      maximum: 52,
      minimum: 1,
    },
  })
  remaining: number;

  @property.array(Card)
  cards: Card[];

  constructor(data?: Partial<Deck>) {
    super(data);
  }
}

export interface DeckRelations {
  // describe navigational properties here
}

export type DeckWithRelations = Deck & DeckRelations;
