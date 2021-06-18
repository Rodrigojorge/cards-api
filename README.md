# cards-api

This API was developed with Loopback 4 (https://loopback.io/).

The goal is to create an API to handle decks and cards to be used in any game like Poker, BlackJack and others.

The API have the following methods to handle cards and decks:

  - Create a new Deck (POST ​/decks)
  - Open a Deck (GET ​/decks/{id})
  - Draw a Card(s) from the Deck (GET ​/decks/{id}/cards)

It was developed using an in-memory database from loopback.

## Test cards-api

The following tests were implemented:

```bash


  DeckController (acceptance)
    ✔ it should create a new deck - invokes POST /decks (123ms)
    ✔ it should fail with a null id - invokes POST /decks
    ✔ it should open a deck - invokes GET /decks/{id} (52ms)
    ✔ it should not open an invalid deck - invokes GET /decks/{id}/cards
    ✔ it should draw a card - invokes GET /decks/{id}/cards
    ✔ it should draw 5 cards - invokes GET /decks/{id}/cards
    ✔ it should not draw a card from an invalid deck - invokes GET /decks/{id}/cards

  HomePage (acceptance)
    ✔ exposes a default home page
    ✔ exposes self-hosted explorer

  PingController (acceptance)
    ✔ invokes GET /ping

  DeckService (unit)
    ✔ it should create a deck
    ✔ it should create a deck of 52 cards
    ✔ it should create a deck of a specific number of cards
    ✔ it should create a shuffled a deck
    ✔ it should not open cards from an invalid deck
    ✔ it should draw a card
    ✔ it should draw an exact number of cards
    ✔ it should not draw more than the remaining cards
    ✔ it should not draw cards from an invalid deck


  19 passing (623ms)
```

## Run the cards-api

To run the cards-api, build the Dockerfile inside the **api** folder and run the container:

```bash
$ cd api
$ docker build -t cards-api .
$ docker run -dp 3000:3000 cards-api
```

Or If you have docker-compose installed: 

```bash
$ docker-compose -f "docker-compose.yml" up -d --build
```

---

## Development

There is also a docker-compose-dev.yml file which creates a dev container with a node image and loopback installed, using the Dockerfile located in the root folder. 

Using the Remote Development (ms-vscode-remote.vscode-remote-extensionpack) VSCode extensions, you can easily attach VSCode to the container without installing anything more directly on your machine. 

### To run tests


```bash
$ npm run test
```
##
