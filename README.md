# Pazaak

<img width="320" height="136" src="https://pa1.narvii.com/6662/d333a7ff06dbc41bfec27e4afa338519947e1670_00.gif">

## Have a sit

I guess your droid is not working properly and I also guess you are not in cantina so you have to read this manual setup to lose some credits. Or you think you can win?

Anyway, follow me step-by-step

First of all, install dependencies with

```javascript
npm install
```

Start your work with

```javascript
npm start
```

Your game screen will be opened here

```
http://localhost:1234
```

## Cantina

Drop by sometimes

[Heroku project](https://some-url.com)

## What is pazaak

Pazaak is a very old card game in which you have to reach 20 points or get closer to that than your opponent with your cards

Rules:
- there is main deck with common cards that can add or substract from player's current score
- there is also side deck with player's own cards with various effects
- player gets 4 random cards from their side deck when game starts. These cards forms their hand
- each turn player plays top card from main deck and then also could play card from their hand or skip. Player's score will be frozen after skip
- player reaching 20 points automatically skips
- game passes to other player at the end of the turn
- each round ends when:

  - both players have skipped. Player with best score wins the round
  - one of the players went over points. Their opponent wins the round
  - one of the players have filled all of the slots in their board. This player wins the round

- game ends after one of the players have won 3 rounds

## Make pazaak great again

Please check [contributing guideline](https://github.com/yandex-course-amsterdam/goty/blob/main/CONTRIBUTING.md) to start contributing to this project
