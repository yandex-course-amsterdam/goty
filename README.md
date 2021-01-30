# GOTY

<img width="320" height="136" src="https://pa1.narvii.com/6662/d333a7ff06dbc41bfec27e4afa338519947e1670_00.gif">

<br />
<br />

## Jumpstart

Welcome here, pal

To start your local project please first install dependencies

Also note that you should use `.env` file for local development to set environment variables and have mongo and postgres databases running locally. You could make one off of `.env.sample`. Make sure environment variables match your local configuration.

```javascript
npm install
```

Start your work with

```javascript
npm start
```

Your game screen will be opened here

```
http://localhost:5000
```

<br />
<br />

## Test

Project is covered by snapshot testing. To run tests please use

```javascript
npm test
```

If you have to add some changes that don't match existing snapshots intentionally then please update snapshots with

```javascript
npm run test:update
```

<br />
<br />

## Build

We use [Docker Compose](https://docs.docker.com/compose/) to build project

Make sure you have Docker installed on your machine before before proceed with following commands. Also please note that following commands use `.env` file to set environment variables. You could make one off of `.env.sample`

Run project via Docker Compose

```javascript
npm run compose
```

Build and run project via Docker Compose

```javascript
npm run compose:build
```

<br />
<br />

## Heroku

Drop by sometimes

[Heroku project](https://some-url.com)

<br />
<br />

## Rules

You play as a small black circle that could shoot projectiles to hit the enemies

For each enemy hit you will earn points

If enemy hits you game ends and your score will be save to leaderboard

<br />
<br />

## Help us get better

Please check [contributing guideline](https://github.com/yandex-course-amsterdam/goty/blob/main/CONTRIBUTING.md) to start contributing to this project
